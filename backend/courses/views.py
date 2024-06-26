from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions

from users.models import InstructorUserPermissions, User

import datetime

from .serializers import AnswerSerializer, ClusterSerializer, CourseSerializer, QuestionSerializer, AssignmentSerializer
from .models import Answer, Cluster, Course, Assignment, Question
from users.serializers import UserSerializer

"""
Register course to database
"""
class CreateCourseAPIView(APIView):
    def post(self, request):
        permission_classes = (InstructorUserPermissions,)
        serializer = CourseSerializer(data = request.data)
        serializer.is_valid(raise_exception=True) # validation
        serializer.save()
        return Response(serializer.data)
    
class GetCourseAPIView(APIView):
    def get(self, request, id):
        courseId = id
        crs = Course.objects.filter(id = courseId).first()
        if crs is not None: 
            crsSerializer = CourseSerializer(crs)
            return Response(crsSerializer.data)
        else:
            raise exceptions.NotFound("Course not found")


class GetCoursesAPIView(APIView):
    def get(self, request, email):
        userEmail = email

        response = Response()

        response.data = {
            "student-courses": [],
            "ta-courses": [],
            "instructor-courses": []
        }
        
        studentCrs = Course.objects.filter(students__email = userEmail).all()
        if studentCrs is not None:
            for crs in studentCrs:
                crsSerializer = CourseSerializer(crs)
                response.data['student-courses'].append(crsSerializer.data)
        
        taCrs = Course.objects.filter(tas__email = userEmail).all()
        if taCrs is not None:
            for crs in taCrs:
                crsSerializer = CourseSerializer(crs)
                response.data['ta-courses'].append(crsSerializer.data)
        
        insCrs = Course.objects.filter(instructors__email = userEmail).all()
        if insCrs is not None:
            for crs in insCrs:
                crsSerializer = CourseSerializer(crs)
                response.data['instructor-courses'].append(crsSerializer.data)

        return response

class GetAssignmentAPIView(APIView):
    def get(self, request, id):
        asmId = id

        asm = Assignment.objects.filter(id = asmId).first()
        response = Response()

        if asm is not None:
            asmSerializer = AssignmentSerializer(asm)
            response.data = asmSerializer.data
        
        return response

class GetAssignmentsAPIView(APIView):
    def get(self, request, id):
        courseId = id

        asms = Assignment.objects.filter(courseId = courseId).all()
        response = Response()

        response.data = []

        if asms is not None:
            for asm in asms:
                asmSerializer = AssignmentSerializer(asm)
                response.data.append(asmSerializer.data)
        
        return response

class GetStudentAPIView(APIView):
    def get(self, request, id):
        student = User.objects.filter(id = id).first()

        if student is not None:
            return Response({
                "id": student.id,
                "name": student.name,
                "email": student.email
            })
        else:
            raise exceptions.NotFound("Student not found")

class GetStudentsAPIView(APIView):
    def get(self, request, id):
        courseId = id

        crs = Course.objects.filter(id = courseId).first()
        if crs is None:
            raise exceptions.NotFound("Course id invalid")

        students = crs.students.all()
        response = Response()

        response.data = []

        if students is not None:
            for st in students:
                stSerializer = UserSerializer(st)
                response.data.append(stSerializer.data)
        
        return response

"""
Remove a student from course
"""
class RemoveStudentAPIView(APIView):
    def post(self, request):
        course_id = request.data['courseId']
        student_id = request.data['studentId']

        crs = Course.objects.filter(id = course_id).first()

        if crs is None:
            raise exceptions.NotFound("Course id invalid")
        
        student = crs.students.filter(id = student_id).first()

        if student is None:
            raise exceptions.NotFound("Student id invalid")
        
        response = Response()
        crs.students.remove(student)
        response.data = {
            "message": "success"
        }

        return response


"""
Get questions data 
"""
class GetQuestionsAPIView(APIView):
    def get(self, request, assignment_id):
        asm = Assignment.objects.filter(id = assignment_id).first()
        if asm is None:
            raise exceptions.NotFound("Assignment id invalid")

        questions = Question.objects.filter(assignmentId = assignment_id)
        response = Response()
        response.data = []

        if questions is not None:
            for q in questions:
                qSerializer = QuestionSerializer(q)
                response.data.append(qSerializer.data)
        
        return response

"""
Get question data 
"""
class GetQuestionAPIView(APIView):
    def get(self, request, q_id):
        q = Question.objects.filter(id = q_id).first()
        if q is None:
            raise exceptions.NotFound("Question id invalid")
        
        response = Response()
        qSerializer = QuestionSerializer(q)
        response.data = qSerializer.data
        
        return response

class RemoveQuestionAPIView(APIView):
    def post(self, request):
        question_id = request.data['questionId']

        question = Question.objects.filter(id = question_id).first()

        if question is None:
            raise exceptions.NotFound("Question id invalid")
        
        question.delete()

        return Response({
            "message": "success"
        })

"""
Get answer
"""
class GetAnswerAPIView(APIView):
    def get(self, request, question_id):
        answer = Answer.objects.filter(questionId = question_id).first()
        response = Response()

        if answer is None:
            response.status_code = 404
            response.data = {
                "message": "No answer found for this question"
            }
            return response
        
        response.data = AnswerSerializer(answer).data
        return response

"""
Post answer to question
"""
class PostAnswerAPIView(APIView):
    def post(self, request):
        # Check if question has already been answered
        question_id = request.data['questionId']

        question = Question.objects.filter(id = question_id).first()

        if question is None:
            raise exceptions.NotFound("Question id invalid")
        
        asm = question.assignmentId
        
        if asm is None:
            raise exceptions.NotFound("Assignment not found")

        if question.answeredStatus == False:
            # Check to see if an answer object has already been created for this question
            ans = Answer.objects.filter(questionId = question).first()
            ta = User.objects.filter(id = request.data['taId']).first()
            if ans is None:
                serializer = AnswerSerializer(data = request.data)
                serializer.is_valid(raise_exception=True) # validation
                serializer.save()
            else:
                setattr(ans, 'content', request.data['content'])
                setattr(ans, 'taId', ta)
                setattr(ans, "dateSubmitted", datetime.datetime.now().isoformat())
                ans.save()
            question.answeredStatus = True
            question.claimedStatus = True
            question.save()      
            asm.numAnswered += 1
            asm.save()

        # Modify the answer otherwise
        else:
            answer = Answer.objects.filter(questionId = question_id).first()
            ta = User.objects.filter(id = request.data['taId']).first()
            if ta is None:
                raise exceptions.NotFound("TA id invalid")
            setattr(answer, 'content', request.data['content'])
            setattr(answer, 'taId', ta)
            setattr(answer, "dateSubmitted", datetime.datetime.now().isoformat())
            answer.save()
        
        return Response({
                "message": "success"
        })

"""
Get all clusters for a given assignment
"""
class GetClustersAPIView(APIView):
    def get(self, request, assignment_id):
        asm = Assignment.objects.filter(id = assignment_id).first()
        if asm is None:
            raise exceptions.NotFound("Assignment id invalid")

        clusters = Cluster.objects.filter(asmId = assignment_id).all()
        response = Response()
        response.data = []

        if clusters is not None:
            for c in clusters:
                cSerializer = ClusterSerializer(c)
                response.data.append(cSerializer.data)
        
        return response

"""
Get all clusters (just the content: id, and questions' content) for a given assignment
Will exclude questions that have been claimed/answered
"""
class GetClustersContentAPIView(APIView):
    def get(self, request, assignment_id):
        asm = Assignment.objects.filter(id = assignment_id).first()
        if asm is None:
            raise exceptions.NotFound("Assignment id invalid")

        clusters = Cluster.objects.filter(asmId = assignment_id)
        response = Response()
        response.data = []

        if clusters is not None:
            for c in clusters:
                questions = []
                for q in c.questions.all():
                    # Filter out questions that have been claimed
                    if q.claimedStatus == True:
                        continue

                    questions.append({
                        "id": q.id,
                        "content": q.content
                    })
                response.data.append(questions)
        
        return response

"""
Post a set of questions as being claimed
"""
class PostClaimedQuestionsAPIView(APIView):
    def post(self, request):
        assignment_id = request.data["assignment_id"]
        questions_claimed = request.data["claimedQuestions"]
        ta_id = request.data["ta_id"]

        asm = Assignment.objects.filter(id = assignment_id).first()

        if asm is None:
            raise exceptions.NotFound("Assignment id invalid")
        
        questions = Question.objects.filter(assignmentId = assignment_id, id__in=questions_claimed).all()

        if questions is None:
            raise exceptions.NotFound("These questions are not found in this assignment")
        
        questions.update(claimedStatus = True)
        
        for q in questions:
            ans = Answer.objects.filter(questionId = q).first()
            if ans is None:
                Answer.objects.create(
                    questionId = Question.objects.filter(id = q.id).first(),
                    taId = User.objects.filter(id = ta_id).first()
                )
            else:
                ans.taId = User.objects.filter(id = ta_id).first() # Update the answerer to be the TA
                ans.save()

        return Response({
                "message": "success"
        })

class RemoveClaimedQuestionsAPIView(APIView):
    def post(self, request):
        assignment_id = request.data["assignment_id"]
        questions_unclaimed = request.data["claimedQuestions"]
        ta_id = request.data["ta_id"]

        ta = User.objects.filter(id = ta_id).first()
        if ta is None:
            raise exceptions.NotFound("TA id invalid")

        asm = Assignment.objects.filter(id = assignment_id).first()

        if asm is None:
            raise exceptions.NotFound("Assignment id invalid")
        
        questions = Question.objects.filter(assignmentId = assignment_id, id__in=questions_unclaimed).all()

        if questions is None:
            raise exceptions.NotFound("These questions are not found in this assignment")
        
        # Unclaim
        questions.update(claimedStatus = False)
        
        for q in questions:
            ans = Answer.objects.filter(questionId = q, taId = ta).first()
            if ans is None:
                continue

            if q.answeredStatus == False:
                ans.delete()
            else:
                ans.taId = None # Remove claimed status
                ans.save()

        return Response({
                "message": "success"
        })

"""
Get all questions claimed/answered by a TA
"""
class GetQuestionsByTAIdAPIView(APIView):
    def get(self, request, ta_id):
        ta = User.objects.filter(id = ta_id).first()
        if ta is None:
            raise exceptions.NotFound("TA id invalid")

        answers = Answer.objects.filter(taId = ta).all()
        
        response = Response()
        response.data = []

        if answers is None:
            return response # Empty response in this case
        
        for ans in answers:
            q = ans.questionId
            qSerializer = QuestionSerializer(q)
            response.data.append(qSerializer.data)
        
        return response

        
        


