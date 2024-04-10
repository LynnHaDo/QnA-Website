from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions

from users.models import InstructorUserPermissions

from .serializers import AnswerSerializer, CourseSerializer, QuestionSerializer, AssignmentSerializer
from .models import Course, Assignment
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
Get questions data 
"""
class GetQuestionsAPIView(APIView):
    def get(self, request):
        return Response(QuestionSerializer(request.question).data)

"""
Post answer to question
"""
class PostAnswerAPIView(APIView):
    def post(self, request):
        serializer = AnswerSerializer(data = request.data)
        serializer.is_valid(raise_exception=True) # validation
        serializer.save()
        return Response(serializer.data)