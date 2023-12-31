from rest_framework import serializers
from .models import Teacher, Parent, Student, Adminstaff, Classroom, Notification


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    classes_taught = ClassroomSerializer(many=True, read_only=True)

    class Meta:
        model = Teacher
        fields = '__all__'



class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = '__all__'



class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class AdminstaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adminstaff
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'




# from .models import Useraccount,Usermanager

# class UseraccountSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Useraccount
#         fields = '__all__'

# class UsermanagerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Usermanager
#         fields = '__all__'
