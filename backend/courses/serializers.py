from rest_framework.serializers import ModelSerializer
from courses.models import Course, Question, Answer

"""
Serialize course
"""
class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course 
        fields = ['id', 'code', 'name', 'semester'] # only return these values
    
    # Called when a course is created
    def create(self, validated_data):
        instance = self.Meta.model(**validated_data) # create user with data (other than password)
        instance.save()
        return instance

class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question 
        fields = ['id', 'content', 'assignmentId', 'studentId']
    
    def create(self, validated_data):
        instance = self.Meta.model(**validated_data) # create user with data (other than password)
        instance.save()
        return instance

class AnswerSerializer(ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'content', 'taId', 'questionId']
    
    def create(self, validated_data):
        instance = self.Meta.model(**validated_data) # create user with data (other than password)
        instance.save()
        return instance

