from django.db import models
from django.utils import timezone

# Create your models here.
class Chatdemo(models.Model):
    sale_id = models.CharField(max_length=10,unique=True)
    allocation_id = models.IntegerField()
    used_id = models.IntegerField()
    avialable_id = models.IntegerField(default=1)
    month_id = models.IntegerField(default=1)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.sale_id

class Profile(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.CharField(max_length=20)
    fname = models.CharField(max_length=20)
    lname =models.CharField(max_length=20)
    pic = models.ImageField(upload_to="profile/",blank=True,null=True)

    def __str__(self):
        return self.name  
class Home(models.Model):
    fullname = models.CharField(max_length=20)
    f_name =models.CharField(max_length=10)
    l_name = models.CharField(max_length=10)
    password = models.CharField(max_length=10)
    status = models.CharField(max_length=20) 

    def __str__(self):
        return self.fullname

class Books(models.Model):
    book_id = models.CharField(max_length=10, unique=True)
    book_name = models.CharField(max_length=20)
    total_book = models.IntegerField()
    book_issue = models.IntegerField()
    book_avl = models.IntegerField()

    def __str__(self):
        return self.book_id  

class Student(models.Model):
    stu_id = models.CharField(max_length=10, unique=True)
    stu_name = models.CharField(max_length=20)
    stu_roll = models.IntegerField()
    stu_stream = models.CharField(max_length=10)
    stu_city = models.CharField(max_length=20)  

    def __str__(self):
        return self.stu_id   
class Employee(models.Model):
    emp_id = models.CharField(max_length=10,unique=True)
    emp_name = models.CharField(max_length=100)
    emp_degn = models.CharField(max_length=20)
    emp_city = models.CharField(max_length=20)
    emp_salary = models.IntegerField()

    def __str__(self):
        return self.emp_id  

class Budget(models.Model):
    bug_id = models.CharField(max_length=10)
    bug_allocation = models.IntegerField()
    bug_used = models.IntegerField()
    bug_avl = models.IntegerField()
    bug_month = models.CharField(max_length=10)

    def __str__(self):
        return self.bug_id          
class Profiles(models.Model):
    p_name = models.CharField(max_length=20)
    p_email = models.EmailField(unique=True)
    p_phone = models.IntegerField()
    p_city = models.CharField(max_length=20)
    p_state = models.CharField(max_length=20)
    p_country = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.p_name

class Biodata(models.Model):
    b_name = models.CharField(max_length=20)
    b_age = models.IntegerField()
    b_city = models.CharField(max_length=20)
    b_gender = models.CharField(max_length=20)
    b_dob = models.DateField()
    b_pic = models.FileField(upload_to="b_pic/",blank=True,null=True)    

    def __str__(self):
        return self.b_name
class Marks(models.Model):
    r_name = models.CharField(max_length=20)
    r_roll = models.CharField(max_length=10,unique=True)
    r_math = models.IntegerField()
    r_science = models.IntegerField()
    r_english = models.IntegerField()
    r_odia = models.IntegerField()
    r_history = models.IntegerField()
    r_geography = models.IntegerField()
    r_total = models.IntegerField()

    def __str__(self):
        return self.r_name

class Expense(models.Model):
    e_month = models.CharField(max_length=20)
    allocate = models.DecimalField(max_digits=10,decimal_places=2)
    grocery = models.DecimalField(max_digits=10,decimal_places=2)
    shopping = models.DecimalField(max_digits=10,decimal_places=2)
    bill = models.DecimalField(max_digits=10,decimal_places=2)
    food = models.DecimalField(max_digits=10,decimal_places=2)
    travel = models.DecimalField(max_digits=10,decimal_places=2)
    total = models.DecimalField(max_digits=10,decimal_places=2)
    avl = models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return self.e_month
class Complain(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    mob = models.IntegerField()
    city = models.CharField(max_length=20)
    issue = models.CharField(max_length=100)
    image = models.FileField(upload_to="image/",null=True,blank=True)
    time = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name 
class Bank(models.Model):
    user = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    user_id = models.CharField(max_length=10,unique=True)
    phone_no = models.IntegerField()
    home = models.CharField(max_length=20)
    ac_type = models.CharField(max_length=20)
    ac_no = models.IntegerField()
    pics = models.FileField(upload_to="pics/",null=True,blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
class Banking(models.Model):
    name = models.CharField(max_length=100)
    ac_no = models.IntegerField(unique=True)
    credit = models.DecimalField(max_digits=100,decimal_places=2)
    debit = models.DecimalField(max_digits=100,decimal_places=2)
    mode = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=100,decimal_places=2)
    time = models.DateTimeField()
    created_at= models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=100) 

    def __str__(self):
        return self.name   

class Register(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=100)
    dob = models.DateField()
    mob_no = models.IntegerField()
    city= models.CharField(max_length=100)
    dist= models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    pic = models.FileField(upload_to="pic/",null=True,blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
class Shop(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    dress = models.IntegerField()
    shirt = models.IntegerField()
    pant = models.IntegerField()
    place = models.CharField(max_length=100)

    def __str__(self):
        return self.name


