from django.shortcuts import render
from django.db.models import Sum
from django.db.models import Q
from django.http import JsonResponse
from django.contrib.auth import authenticate,login
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import Chatdemo
from .models import Profile
from .models import Profiles
from .models import Home
from .models import Books
from .models import Student
from .models import Employee
from .models import Budget
from .models import Biodata
from .models import Marks
from .models import Expense
from .models import Complain
from .models import Bank
from .models import Banking
from .models import Register
from .models import Shop
import json
import os



# Create your views here.
def base(request):
    return render(request,"base.html")

@csrf_exempt
def base_view(request):
    try:
        if request.method == "POST":

            sale_id = request.POST['sale_id']
            allocation_id = request.POST['allocation_id']
            used_id = request.POST['used_id']
            avialable_id = request.POST['avialable_id']
            month_id = request.POST['month_id']

             

            if Chatdemo.objects.filter(sale_id = sale_id).exists(): 
                return JsonResponse({
                    "status_code":400,
                    "message":"sale id already exist"
                })

            Chatdemo.objects.create(
                sale_id = sale_id,
                allocation_id= allocation_id,
                used_id= used_id,
                avialable_id= avialable_id,
                month_id= month_id,
            )

            return JsonResponse({
                "status_code" : 200,                
            })
    except Exception as e:
        return JsonResponse({
            "status_code" :500,
            "message":str(e)
        }) 
    
def chat(request):
    return render(request,'chat.html') 

@csrf_exempt
def list_view(request):
    try:
        if request.method == "GET":            
            chatList = list(Chatdemo.objects.values('month_id').annotate(
                    allocation = Sum('allocation_id'),
                    used = Sum('used_id'),
                    avialable = Sum('avialable_id')
                    ).order_by('month_id'))
           
            print("data:",chatList)



            return JsonResponse({
                "status_code": 200,
                "lists" : chatList
            })
    except Exception as e:
        return JsonResponse({
            "status_code":500,            
        })  
@csrf_exempt
def table_view(request):
    try:
        assets = list(Chatdemo.objects.values(
            'id',
            'sale_id',
            'allocation_id',
            'used_id',
            'avialable_id',
            'month_id'
        ))
        return JsonResponse({
            "status_code" : 200,
            "assets" : assets
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 200,
            "message" : str(e)
        })
def table_views(request):
    return render(request,"list.html")

@csrf_exempt
def pchat_view(request):
    try:
        budgets = list(Chatdemo.objects.values('allocation_id','used_id','avialable_id'))

        return JsonResponse({
            "status_code" : 200,
            "message": "fetch Successfully",
            "budgets" : budgets
        })
    except Exception as e:
        return JsonResponse({
            "status_code":500,
            "message": str(e)
        })
@csrf_exempt
def asset_delete(request): 
    try:
        if request.method == "POST":
            print("hyyy")
            del_id = request.POST['id']
            print("asset_id:",del_id)
            asset = Chatdemo.objects.get(id=del_id)
            print("asset",asset)
            asset.delete() 

            return JsonResponse({
                "status_code" : 200,
                "message": "deleted successfully"
            })  
        return JsonResponse({
            "status_code":405,
            "message":"method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code":500,
            "message":str(e)
        })
@csrf_exempt
def line_view(request):
    try:
        lines= list(Chatdemo.objects.values('month_id')
                    .annotate(allocation= Sum('allocation_id'),used= Sum('used_id'),avl = Sum('avialable_id')).order_by('month_id'))
        return JsonResponse({
            "status_code": 200,
            "message":"fetch successfully",
            "lines":lines
        })
    except Exception as e:
        return JsonResponse({
            "status_code":500,
        })
@csrf_exempt
def statter_view(request):
    try:        
        statData= list(Chatdemo.objects.values('month_id').annotate(
                allocation = Sum('allocation_id'),
                used = Sum('used_id'),
                avialable = Sum('avialable_id')).order_by('month_id'))        
        return JsonResponse({
                "status_code":200,
                "message":"fetch successfully",
                "statData": statData
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code":500,
            "message":str(e)
        })   
@csrf_exempt
def edit_asset(request):
    try:
        if request.method == "POST":
            edits_id = request.POST["id"]

            editsData = Chatdemo.objects.get(id=edits_id)

            return JsonResponse({
                "status_code":200,
                "message":"data founnd",
                "editsData":{
                    'id': editsData.id,
                    'edit_sale':editsData.sale_id,
                    'edit_allocation':editsData.allocation_id,
                    'edit_used':editsData.used_id,
                    'edit_avialable':editsData.avialable_id
                }
            })
        return JsonResponse({
            "status_code":405,
            "message":"data not found"
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code":500,
            "message": str(e)
        })
@csrf_exempt
def asset_update(request):
    try:
        if request.method == "POST":
            
            edit_id = request.POST['edit_id']
            edit_sale = request.POST['edit_sale']
            print("sale",edit_sale)
            edit_allocation= request.POST['edit_allocation']
            edit_used = request.POST['edit_used']
            edit_avialable = request.POST['edit_avialable']

            budget = Chatdemo.objects.get(id=edit_id)    
            print("budget:",budget)
            
            budget.sale_id = edit_sale
            budget.allocation_id = edit_allocation
            budget.used_id = edit_used
            budget.avialable_id = edit_avialable
            budget.save()
        

            return JsonResponse({
                "status_code" : 200,
                "message" : "Updated Successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "data not found"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def bar(request):
    return render(request,'charts/barchat.html') 
   
@csrf_exempt
def bar_view(request):
    try:
        barList = list(Chatdemo.objects.values('month_id').annotate(
            allocation = Sum('allocation_id'),
            used = Sum('used_id'),
            avialable = Sum('avialable_id')
        ).order_by('month_id'))

        return JsonResponse({
            "status_code":200,
            "message" : 'get successfully',
            "bar" : barList
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message": str(e)
        })
    
def pie(request):
    return render(request,'charts/piechat.html')  
  
@csrf_exempt
def pie_view(request):
    try:
        pieList = list(Chatdemo.objects.values('allocation_id','used_id','avialable_id'))

        return JsonResponse({
            "status_code" : 200,
            "message" : "get Successfully",
            "pie" : pieList
        })
    except Exception as e:
        return JsonResponse({
            "status_code": 500,
            "message" : str(e)
        })

def radar(request):
    return render(request,'charts/radarchat.html')
    
@csrf_exempt
def radar_view(request):
    try:
        radarList = list(Chatdemo.objects.values('month_id').annotate(
            Allocation = Sum('allocation_id'),
            Used = Sum('used_id'),
            Avialable = Sum('avialable_id')
        ).order_by('month_id'))                 
        return JsonResponse({
            "status_code" : 200,
            "message" : "get data successfully",
            "radar" : radarList
        })
    except Exception as e:
        return JsonResponse({
            "status_code": 500,
            "message": str(e)
        })
def table(request):
    return render(request, 'pagination/table.html') 
@csrf_exempt
def table_data(request):
    try:
        tables = list(Chatdemo.objects.values(
                        'id',
                        'sale_id',
                        'allocation_id',
                        'used_id',
                        'avialable_id',
                        'month_id'
        ))   
        return JsonResponse({
             "status_code" :200,
             "message" : 'get successfully',
             'tables' : tables
         })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })

@csrf_exempt
def tables_data(request):
    try:
        ptables = list(Chatdemo.objects.values(
                        'id',
                        'sale_id',
                        'allocation_id',
                        'used_id',
                        'avialable_id',
                        'month_id'
        ))   
        return JsonResponse({
             "status_code" :200,
             "message" : 'get successfully',
             'ptables' : ptables
         })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def line(request):
    return render(request,'charts/linechat.html') 
@csrf_exempt
def line_view(request):
    try:
        lines = list(Chatdemo.objects.values('month_id').annotate(
            allocation = Sum('allocation_id'),
            used = Sum('used_id'),
            avl = Sum("avialable_id")
        ).order_by('month_id')) 

        return JsonResponse({
            "status_code" : 200,
            "message" : "data get successfully",
            "lines" :lines
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 200,
            "message" : str(e)
        })
def profile_create(request):
    return render(request, 'profile/profile.html' )
@csrf_exempt
def profile_view(request):
    try:
        if request.method == "POST":
            name = request.POST['name']
            email = request.POST['email']
            password = request.POST['password']
            fname = request.POST['fname']
            lname = request.POST['lname'] 
            pic = request.FILES.get('pic')
            print("name:",name)
            print('img:',pic) 
            pic = request.FILES.get('pic')
            
            if Profile.objects.filter(name=name).exists():
                return JsonResponse({
                    "status_code" :400,
                    "message": "name already exists."
                })
            if Profile.objects.filter(email=email).exists():
                return JsonResponse({
                    "status_code" : 400,
                    "message" :"email already exists."
                }) 

            if pic:
                upload_dir = os.path.join(settings.BASE_DIR,'static','pic/'+ email )

                os.makedirs(upload_dir, exist_ok=True)

                file_path = os.path.join(upload_dir, pic.name)

                with open(file_path, 'wb+') as destination:
                    for chunk in pic.chunks():
                        destination.write(chunk)               

            Profile.objects.create(
                name = name,
                email = email,
                password = password,
                fname = fname,
                lname = lname,
                pic = pic.name
            )
            return JsonResponse({
                "status_code" : 200,
                "message" : "profile create successfully"
            })
        return JsonResponse({
            "message": 405,
            "message": "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def plist_view(request):
    try:
        profiles= list(Profile.objects.values(
            'id',
            'name',
            'email',
            'password',
            'fname',
            'lname',
            'pic'
        ))
        return JsonResponse({
            "status_code" : 200,
            "message" : 'data get successfully',
            "profiles" : profiles
        })
    except Exception as e:
        return JsonResponse({
            "status_code": 500,
            "message" : str(e)
        })
def profile_table(request):
    return render(request,'profile/profile_view.html')    
def profiles(request):
    id = request.GET.get('id', '')
    return render(request,'profile/profiles.html', {'id': id}) 
@csrf_exempt
def profiles_view(request):
    try:
        if request.method == "POST":
             get_id = request.POST['id']
             lists = Profile.objects.get(id=get_id)
             
             
             return JsonResponse({
                     "status_code" : 200,
                     "message" : "show successfully",
                     "profiles" : {
                         'id':lists.id,
                         'name' :lists.name,
                         'email' : lists.email,
                         'password' : lists.password,
                         'fname': lists.fname,
                         'lname' : lists.lname,
                         'pic':lists.pic.url
                     }
                 })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
     
@csrf_exempt
def profiles_views(request):
    try:
        id = request.POST['id']
        profileData = list(Profile.objects.values('name','email','password','fname','lname','pic','id').filter(id=id))

        return JsonResponse({
            "status_code":200,
            "profileData": profileData
        })
    except Exception as e:
        return JsonResponse({
            "status_code":500,
            "message":str(e)
        })
@csrf_exempt
def update_profile(request): 
    try:
        if request.method == "POST":
            name = request.POST['u_name']
            print("name:",name)
            id = request.POST['u_id']
            print("ID:",id)
            email = request.POST['u_email']
            password = request.POST['u_password']
            fname = request.POST['u_fname']
            lname = request.POST['u_lname']
            pic = request.FILES.get('u_pic')

            profile = Profile.objects.get(id=id)
            
            profile.name = name
            profile.email = email
            profile.password = password
            profile.fname = fname
            profile.lname = lname
            
            if pic:                            
                  upload_dir = os.path.join(settings.BASE_DIR,'static','pic/'+ email )
            
                  os.makedirs(upload_dir, exist_ok=True)
            
                  file_path = os.path.join(upload_dir, pic.name)
            
                  with open(file_path, 'wb+') as destination:
                   for chunk in pic.chunks():
                    destination.write(chunk)            
            profile.pic = pic.name

            profile.save()

            return JsonResponse({
                "status_code" : 200,
                "message" : "updated successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message": "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def home(request):
    return render(request,'home/home.html') 
@csrf_exempt
def home_view(request):
    try:
        if request.method == "POST":
            f_name = request.POST['f_name']
            l_name = request.POST['l_name']
            full_name = request.POST['full_name'] 
            password = request.POST['password']

            if  Home.objects.filter(fullname=full_name).exists():
                return JsonResponse({
                    "status_code" : 400,
                    "message" :"name already exists"
                })

            Home.objects.create(
                f_name = f_name,
                l_name = l_name,
                fullname = full_name,
                password = password,
                status = "Active"
            )
            return JsonResponse({
                "status_code" : 200,
                "message" : "create successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def login(request):
    return render(request,'home/login.html')     
@csrf_exempt
def login_view(request):
    try:
        if request.method == "POST":
            username = request.POST['username']
            password = request.POST['password']

            user = Home.objects.filter(fullname=username,password=password).first()

            if not user:
                return JsonResponse({
                    "status_code":400,
                    "message" :"invalid username and password"
                })
            request.session['user_id'] = user.id
            return JsonResponse({
                    "status_code":200,
                    "message" :"login successfully"
            })

    except Exception as e:
        return JsonResponse({
            "status_code":500,
            "message" :str(e)
        }) 

def book(request):
    return render(request,'table1/create.html')
@csrf_exempt
def book_view(request):
    try:
        if request.method == "POST":
            book_id = request.POST['book_id']
            book_name = request.POST['book_name']
            total_book = request.POST['total_book']
            book_issue = request.POST['book_issue']
            book_avl = request.POST['book_avl']

            if Books.objects.filter(book_id=book_id).exists():
                return JsonResponse({
                    "status_code" : 400,
                    "message" : " id is already exist"
                })

            Books.objects.create(
                book_id = book_id,
                book_name = book_name,
                total_book = total_book,
                book_issue = book_issue,
                book_avl = book_avl
            )
            return JsonResponse({
                "status_code" :200,
                "message" :"table created successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def table(request):
    return render(request,'table1/table.html')    

@csrf_exempt
def table_view(request):
    try:
        books = list(Books.objects.values(
            'id',
            'book_id',
            'book_name',
            'total_book',
            'book_issue',
            'book_avl'
        ))
        return JsonResponse({
            "status_code" : 200,
            "message" : "data fetch successfully",
            "books" : books
        })  
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        }) 
@csrf_exempt
def book_delete(request):
    try:
        if request.method == "POST":
            del_id = request.POST['id']
            print("id:",del_id)

            book = Books.objects.get(id=del_id)

            book.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "book deleted sucessfully"
            }) 
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def student(request):
    return render(request,'table1/student/create.html')      
@csrf_exempt
def stu_create(request):
    try:
        if request.method == "POST":
            stu_id = request.POST['stu_id']
            stu_name = request.POST['stu_name']
            stu_roll = request.POST['stu_roll']
            stu_stream = request.POST['stu_stream']
            stu_city = request.POST['stu_city']      
           
            Student.objects.create(
                stu_id = stu_id,
                stu_name = stu_name,
                stu_roll = stu_roll,
                stu_stream = stu_stream,
                stu_city = stu_city
            )

            return JsonResponse({
                "status_code" : 200,
                "message" : "Student list created successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def student_list(request):
    return render(request,'table1/student/table.html')    
@csrf_exempt
def stu_list(request):
    try:
        if request.method == "GET":
            students = list(Student.objects.values(
                'id',
                'stu_id',
                'stu_name',
                'stu_roll',
                'stu_stream',
                'stu_city'
            )) 
            return JsonResponse({
                "status_code" : 200,
                "message" : "data get successfully",
                "students" : students
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })   
@csrf_exempt
def student_delete(request):
    try:
        if request.method == "POST":
            del_id = request.POST['id']
            print("id:",del_id)

            student = Student.objects.get(id=del_id)

            student.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "book deleted sucessfully"
            }) 
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def employee_list(request):
    return render(request,'table1/employee/emp_table.html')    
@csrf_exempt
def  emp_list(request):
    try:
        if request.method == "GET":
           emps = list(Employee.objects.values(
               'id',
               'emp_id',
               'emp_name',
               'emp_degn',
               'emp_salary',
               'emp_city'
           ))
           return JsonResponse({
               "status_code" : 200,
               "message" : "get successfully",
               "emps" : emps
           })  
        return JsonResponse({
            "status_code" : 405,
            "message" : 'method not allowed'
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def employee_create(request):
    return render(request,'table1/employee/emp_create.html')    

@csrf_exempt
def emp_create(request):
    try:
        if request.method == "POST":
            emp_id = request.POST['emp_id']
            emp_name = request.POST['emp_name']
            emp_degn = request.POST['emp_degn']
            emp_salary = request.POST['emp_salary']
            emp_city = request.POST['emp_city']

            Employee.objects.create(
                emp_id = emp_id,
                emp_name = emp_name,
                emp_degn = emp_degn,
                emp_salary = emp_salary,
                emp_city = emp_city
            )
            return JsonResponse({
                "status_code" : 200,
                "message" : "create successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def emp_delete(request):
    try:
        if request.method == "POST":
            del_id = request.POST['id']
            print("id:",del_id)

            employee = Employee.objects.get(id=del_id)

            employee.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "employee deleted sucessfully"
            }) 
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })  
@csrf_exempt
def emp_edit(request):
    try:
        if request.method == "POST":
            edit_id = request.POST['id'] 

            emps = Employee.objects.get(id=edit_id)

            return JsonResponse({
                "status_code" :200,
                "message" : "data get successfully",
                "emps" : {
                    'id' : emps.id,
                    'emp_id':emps.emp_id,
                    'emp_name': emps.emp_name,
                    'emp_degn' : emps.emp_degn,
                    'emp_salary' :emps.emp_salary,
                    'emp_city' : emps.emp_city
                }
            }) 
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def emp_update(request):
    try:
        if request.method == "POST":
            e_id = request.POST['e_id']
            emp_id = request.POST['emp_id']
            emp_name = request.POST['emp_name']
            emp_degn = request.POST['emp_degn']
            emp_salary = request.POST['emp_salary']
            emp_city = request.POST['emp_city']       

            emp = Employee.objects.get(id=e_id)

            emp.emp_id = emp_id
            emp.emp_name = emp_name
            emp.emp_degn = emp_degn
            emp.emp_salary = emp_salary
            emp.emp_city = emp_city
            emp.save()

            return JsonResponse({
                "status_code" : 200,
                "message" : "update successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def bug_create(request):
    return render(request,'table1/budget/create.html')    
@csrf_exempt
def budget_create(request):
    try:
        if request.method == "POST":
            bug_id = request.POST['bug_id']
            print("id",bug_id)
            bug_allocation = request.POST['bug_allocation']
            print("allo",bug_allocation)
            bug_used = request.POST['bug_used']
            bug_avl = request.POST['bug_avl']
            bug_month = request.POST['bug_month']

            Budget.objects.create(
                bug_id = bug_id,
                bug_allocation = bug_allocation,
                bug_used = bug_used,
                bug_avl = bug_avl,
                bug_month = bug_month
            )
            return JsonResponse({
                "status_code" : 200,
                "message" : "create successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def budget_list(request):
    return render(request,'table1/budget/list.html')      
@csrf_exempt
def budget_list_view(request):
    try:
        if request.method == "GET":

            budgets = list(Budget.objects.values(
                'id',
                'bug_id',
                'bug_allocation',
                'bug_used',
                'bug_avl',
                'bug_month'
            ))
            return JsonResponse({
                "status_code" : 200,
                "message" : "list get successfully",
                "budgets" : budgets
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def bug_delete(request):
    try:
        if request.method == "POST":
            del_id = request.POST['id']

            budget = Budget.objects.get(id=del_id)

            budget.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "deleted successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })  
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def bug_edit(request):
    try:
        if request.method == "POST":
            edit_id = request.POST['id']

            budgets = Budget.objects.get(id=edit_id)

            return JsonResponse({
                "status_code" : 200,
                "message" : "fetch successfully",
                "budgets" : {
                    'id' : budgets.id,
                    'bug_id' : budgets.bug_id,
                    'bug_allocation' : budgets.bug_allocation,
                    'bug_used' : budgets.bug_used,
                    'bug_avl' : budgets.bug_avl,
                    'bug_month' : budgets.bug_month

                }
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def bug_update(request):
    try:
        if request.method == "POST":
            b_id = request.POST['b_id']
            bug_id = request.POST['bug_id']
            bug_allocation = request.POST['bug_allocation']
            bug_used = request.POST['bug_used']
            bug_avl = request.POST['bug_avl']
            bug_month = request.POST['bug_month']

            bug = Budget.objects.get(id=b_id)

            bug.bug_id = bug_id
            bug.bug_allocation = bug_allocation
            bug.bug_used = bug_used
            bug.bug_avl = bug_avl
            bug.bug_month = bug_month

            bug.save()

            return JsonResponse({
                "status_code" : 200,
                "message" : "update successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })

def profile_creates(request):
    return render(request,'table1/profile/create.html')    

@csrf_exempt
def profile_create_view(request):
    try:
        if request.method == "POST":
            p_name = request.POST['p_name']
            p_email = request.POST['p_email']
            p_phone = request.POST['p_phone']
            p_city = request.POST['p_city']
            p_state = request.POST['p_state']            
            p_country = request.POST['p_country']

            Profiles.objects.create(
                p_name = p_name,
                p_email = p_email,
                p_phone = p_phone,
                p_city = p_city,
                p_state = p_state,
                p_country = p_country
            )
            return JsonResponse({
                "status_code" : 200,
                "message" : "created successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def profiles_lists(request):
    return render(request,'table1/profile/list.html')    
@csrf_exempt
def profile_list_views(request):
    try:
        profiles = list(Profiles.objects.values(
            'id',
            'p_name',
            'p_email',
            'p_phone',
            'p_city',
            'p_state',
            'p_country'
        ))
        return JsonResponse({
            "status_code" : 200,
            "message" : "data get successfully",
            "profiles" : profiles
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def profile_deletes(request):
    try:
        if request.method == "POST":
            p_id = request.POST['id']

            profile = Profiles.objects.get(id=p_id)

            profile.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "deleted successfully"
            })
        return JsonResponse({
            "status_code": 405,
            "message" : "method not allowed"
        }) 
    except Exception as e: 
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })   
@csrf_exempt
def profile_edits(request):
    try:
        if request.method == "POST":
            e_id = request.POST['id']

            profiles = Profiles.objects.get(id=e_id)

            return JsonResponse({
                "status_code" : 200,
                "message" : " data get successfully",
                "profiles" : {
                    'id' : profiles.id,
                    'p_name' :profiles.p_name,
                    'p_email' : profiles.p_email,
                    'p_phone' : profiles.p_phone,
                    'p_city' : profiles.p_city,
                    'p_state' : profiles.p_state,
                    'p_country' : profiles.p_country
                }
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def biodata_create(request):
    return render(request, 'table1/biodata/create.html')
@csrf_exempt
def biodata_create_view(request):
    try:
        if request.method == "POST":
            b_name = request.POST['b_name']
            b_age = request.POST['b_age']
            b_city = request.POST['b_city']
            b_gender = request.POST['b_gender']
            b_dob = request.POST['b_dob'] 
            b_pic = request.FILES.get('b_pic')

            if b_pic:
                upload_dir = os.path.join(settings.BASE_DIR,'static','b_pic/'+ b_name)
                os.makedirs(upload_dir,exist_ok=True)
                file_path = os.path.join(upload_dir,b_pic.name)

                with open(file_path, 'wb+') as destination:
                    for chunk in b_pic.chunks():
                        destination.write(chunk)
            Biodata.objects.create(
                b_name = b_name,
                b_age = b_age,
                b_city = b_city,
                b_gender = b_gender,
                b_dob = b_dob,
                b_pic = b_pic.name
            )
            return JsonResponse({
                "status_code" : 200,
                "message" : "created successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def biodata_list(request):
    return render(request,'table1/biodata/list.html')     
@csrf_exempt
def biodata_list_view(request):
    try:
        datas = list(Biodata.objects.values(
            'id',
            'b_name',
            'b_age',
            'b_city',
            'b_pic',
            'b_dob',
            'b_gender'
        ) )
        return JsonResponse({
            "status_code" : 200,
            "message" : "get data successfully",
            "datas" : datas
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })              

@csrf_exempt
def biodata_edit(request):
    try:
        if request.method == "POST":
            e_id = request.POST['id']

            datas = Biodata.objects.get(id=e_id)

            return JsonResponse({
                "status_code" : 200,
                "message" : "data get successfully",
                "datas" : {
                    'id': datas.id,
                    'b_name' : datas.b_name,
                    'b_age' : datas.b_age,
                    'b_gender' : datas.b_gender,
                    'b_dob' : datas.b_dob,
                    'b_city' : datas.b_city,
                    'b_pic' : datas.b_pic.url
                }
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def biodata_delete(request):
    try:
        if request.method == "POST":
            id = request.POST['id']
            biodata = Biodata.objects.get(id=id)

            biodata.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "deleted"
            })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def biodata_update(request):
    try: 
        if request.method == "POST":
            b_id = request.POST['b_id']
            b_name = request.POST['b_name']
            b_age = request.POST['b_age']
            b_city = request.POST['b_city']
            b_gender = request.POST['b_gender']
            b_dob = request.POST['b_dob'] 
            b_pic = request.FILES.get('b_pic')

            bios = Biodata.objects.get(id=b_id)

            bios.b_name = b_name
            bios.b_age = b_age
            bios.b_city = b_city
            bios.b_gender = b_gender
            bios.b_dob = b_dob

            if b_pic:

                upload_dir = os.path.join (settings.BASE_DIR,"static","b_pic/"+ b_name)

                os.makedirs(upload_dir,exist_ok=True)

                file_path = os.path.join(upload_dir,b_pic.name)

                with open(file_path,' wb+ ') as destination:
                    for chunk in b_pic.chunks():
                        destination.write(chunk)

            bios.b_pic = b_pic  

            bios.save()

            return JsonResponse({
                "status_code" : 200,
                "message" : "updated successfully"
            }) 
        return JsonResponse({
            "status_code" : 405,
            "message" : 'method not allowed'
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def marks_create(request):
    return render(request,'table1/marks/create.html')           
@csrf_exempt
def create_marks_view(request):
    try:
        if request.method == "POST":
            name = request.POST['name']
            roll = request.POST['roll']
            math = request.POST['math']
            english = request.POST['english']
            science = request.POST['science']
            odia = request.POST['odia']
            history = request.POST['history']
            geography = request.POST['geography']
            total = request.POST['total']      

            Marks.objects.create(
                r_name = name,
                r_roll = roll,
                r_math = math,
                r_english = english,
                r_science = science,
                r_odia = odia,
                r_history = history,
                r_geography = geography,
                r_total = total
            )
            return JsonResponse({
                "status_code" : 200,
                "message" : "created successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : 'method not allowed'
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def marks_list(request):
    return render(request,'table1/marks/list.html')
@csrf_exempt
def marks_list_view(request):
    try:
        marks = list(Marks.objects.values(
            'id',
            'r_name',
            'r_roll',
            'r_math',
            'r_english',
            'r_science',
            'r_odia',
            'r_history',
            'r_geography',
            'r_total'
        ))
        return JsonResponse({
            "status_code" : 200,
            "message" : "get successfully",
            "marks" : marks
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def marks_edit(request):
    try:
        if request.method == "POST":
            m_id = request.POST['id']
            results = Marks.objects.get(id= m_id)

            return JsonResponse({
                "status_code" : 200,
                "message" : "data get successfully",
                "results" : {
                    'id' : results.id,
                    'name' : results.r_name,
                    'roll' : results.r_roll,
                    'math' : results.r_math,
                    'science' : results.r_science,
                    'english' : results.r_english,
                    'odia' : results.r_odia,
                    'history' : results.r_history,
                    'geography' : results.r_geography,
                    'total' : results.r_total,
                }
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })

@csrf_exempt
def update_marks(request):
    try:
        if request.method == "POST":
            u_id = request.POST['id']
            name = request.POST['name']
            roll = request.POST['roll']
            math = request.POST['math']
            english = request.POST['english']
            science = request.POST['science']
            odia = request.POST['odia']
            history = request.POST['history']
            geography = request.POST['geography']
            total = request.POST['total'] 

            marks = Marks.objects.get(id=u_id)

            marks.r_name = name
            marks.r_roll = roll
            marks.r_math = math
            marks.r_english = english
            marks.r_science = science
            marks.r_odia = odia
            marks.r_history = history
            marks.r_geography = geography
            marks.r_total = total
            marks.save()

            return JsonResponse({
                'status_code' : 200,
                "message" : "updated successfully"
            }) 
        return JsonResponse({
            'status_code' : 405,
            "message" : "method not allowed"
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })   
def expense_create(request):
    return render(request,'table1/expense/create.html')
@csrf_exempt
def create_expense(request):
    try:
        if request.method == "POST":
            month = request.POST['month']
            allocate = request.POST['allocate']
            grocery = request.POST['grocery']
            bill = request.POST['bill']
            food = request.POST['food']
            travel = request.POST['travel']
            shopping = request.POST['shopping']
            total = request.POST['total']
            avl = request.POST['total']

            Expense.objects.create(
                e_month=month,
                allocate=allocate,
                grocery=grocery,
                bill=bill,
                food=food,
                travel=travel,
                shopping=shopping,
                total=total,
                avl=avl
            )
            return JsonResponse({
                "status_code" : 200,
                "mesage" : "created successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def expense_delete(request):
    try:
        if request.method == "POST":
                id = request.POST['id']
                expense = Expense.objects.get(id=id)
        
                expense.delete()
        
                return JsonResponse({
                    "status_code" : 200,
                    "message" : "deleted"
                })
    except Exception as e:
            return JsonResponse({
                "status_code" : 500,
                "message" : str(e)
            })
def expense_list(request):
    return render(request,'table1/expense/list.html')    
@csrf_exempt
def expense_list_view(request):
    try:
        expenses = list(Expense.objects.values(
            'id',
            'e_month',
            'allocate',
            'grocery',
            'shopping',
            'food',
            'travel',
            'bill',
            'total',
            'avl'       
        ))
        return JsonResponse({
                    "status_code" : 200,
                    "message" : "get successfully",
                    "expenses" : expenses
                })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def expense_edit(request):
    try:
        if request.method == "POST":

            id = request.POST['id']

            expenses = Expense.objects.get(id=id)

            return JsonResponse({
                "status_code" : 200,
                "message" : "created successfully",
                "expenses" :{
                    "id" : expenses.id,
                    'month' : expenses.e_month,
                    'allocate' : expenses.allocate,
                    'grocery' : expenses.grocery,
                    'shopping' : expenses.shopping,
                    'bill' : expenses.bill,
                    'travel' : expenses.travel,
                    'food' : expenses.food,
                    'total' : expenses.total,
                    'avl' : expenses.avl
                }
            })
        return JsonResponse({
            'status_code' : 405,
            "message" : "method not allowed"
        })    
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def update_expense(request):
    try:
        if request.method == "POST":
            id = request.POST['id']       
            month = request.POST['month']
            allocate = request.POST['allocate']
            grocery = request.POST['grocery']
            bill = request.POST['bill']
            food = request.POST['food']
            travel = request.POST['travel']
            shopping = request.POST['shopping']
            total = request.POST['total']
            avl = request.POST['total']

            expense = Expense.objects.get(id=id)

            expense.e_month = month
            expense.allocate = allocate
            expense.grocery = grocery
            expense.bill = bill
            expense.food = food
            expense.travel = travel
            expense.shopping = shopping
            expense.total = total
            expense.avl = avl

            expense.save()
            return JsonResponse({
                 "status_code" : 200,
                 "mesage" : "created successfully"
            })
        return JsonResponse({
                "status_code" : 405,
                 "message" : "method not allowed"
         })
    except Exception as e:
            return JsonResponse({
                        "status_code" : 500,
                        "message" : str(e)
            })
def create_complain(request):
    return render(request,'table1/complain/create.html')
@csrf_exempt
def create_complain_view(request):
    try:
        if request.method == "POST":
            name = request.POST['name']
            email = request.POST['email']
            mob = request.POST['mob']
            city = request.POST['city']
            issue = request.POST['issue']
            image = request.FILES.get('image')
            date = request.POST['date']

            if image:

                upload_dir = os.path.join(settings.BASE_DIR,"static","image/"+ email) 

                os.makedirs(upload_dir,exist_ok=True)

                file_path = os.path.join(upload_dir,image.name)

                with open(file_path,"wb+") as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)

            Complain.objects.create(
                    name = name,
                    email = email,
                    mob = mob,
                    city = city,
                    issue = issue,
                    time = date,
                    image = image.name
                )
            return JsonResponse({
                    "status_code" : 200,
                    "message" : "compalin raise successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
       return JsonResponse({
        "status_code" : 500,
        "message" : str(e)
       })
def complain_list(request):
    return render(request,'table1/complain/list.html')    
@csrf_exempt
def complain_list_view(request):
    try:
        if request.method == "GET":
            complains = list(Complain.objects.values(
                'id',
                'name',
                'email',
                'mob',
                'city',
                'time',
                'image',
                'issue'
            ))
            return JsonResponse({
                "status_code" : 200,
                "message" : "data get successfully",
                "complains" : complains
            })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def complain_edit(request):
    try:
        if request.method == "POST":
            id = request.POST['id']
            print("id",id)

            complains = Complain.objects.get(id=id)

            return JsonResponse({
                "status_code" : 200,
                "message" : "fetch successfully",
                "complains" :{
                    'id' : complains.id,
                    'name' : complains.name,
                    'email' : complains.email,
                    'mob' : complains.mob,
                    'issue' : complains.issue,
                    'city' : complains.city,
                    'time' : complains.time,
                    'image' : complains.image.url,

                }
            })
        return JsonResponse({
            'status_code': 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def complain_delete(request):
    try:
        if request.method == "POST":

            id = request.POST['id']

            complains = Complain.objects.get(id=id)

            complains.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "deleted successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        }) 
@csrf_exempt
def update_complain(request):
    try :
        if request.method == "POST":
            id = request.POST['id']
            name = request.POST['name']
            email = request.POST['email']
            mob = request.POST['mob']
            city = request.POST['city']
            issue = request.POST['issue']
            image = request.FILES.get('image')
            date = request.POST['date']

            complains= Complain.objects.get(id=id)

            if image:

                upload_dir = os.path.join(settings.BASE_DIR,"static","image/"+email)

                os.makedirs(upload_dir,exist_ok=True)

                file_path = os.path.join(upload_dir,image.name)

                with open(file_path,"wb+") as destination:
                    for chunk in image.chunks():
                        destination.write(chunk)
            complains.name = name
            complains.email = email
            complains.mob = mob
            complains.city = city
            complains.issue = issue
            complains.time = date
            complains.image = image
            complains.save()

            return JsonResponse({
                "status_code" : 200,
                "message" : "update successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def account_create(request):
    return render(request,'table1/bank/create.html')    
@csrf_exempt
def account_create_view(request):
    try:
        if request.method == "POST":
            user = request.POST['user']
            email = request.POST['email']
            ph_no = request.POST['ph_no']
            ac_no = request.POST['ac_no']
            user_id = request.POST['user_id']
            home = request.POST['home']
            ac_type = request.POST['ac_type']
            pics = request.FILES.get('pics')

            if pics:

                upload_dir = os.path.join(settings.BASE_DIR,"static","pics/"+ email)

                os.makedirs(upload_dir,exist_ok=True)

                file_path = os.path.join(upload_dir,pics.name)
                with open(file_path,"wb+") as destination:
                   for chunk in pics.chunks():
                       destination.write(chunk)


            Bank.objects.create(
                user = user,
                email = email,
                phone_no = ph_no,
                ac_no = ac_no,
                user_id = user_id,
                home = home,
                ac_type = ac_type,
                pics = pics
            )

            return JsonResponse({
                "status_code" : 200,
                "message" : "created successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def bank_list(request):
    return render(request,'table1/bank/list.html')    
@csrf_exempt
def bank_list_view(request):
    try:
        banks = list(Bank.objects.values(
            'id',
            'user',
            'email',
            'user_id',
            'ac_no',
            'phone_no',
            'home',
            'ac_type',
            'pics'
        ))
        return JsonResponse({
            "status_code" : 200,
            "message" : "data get successfully",
            "banks" : banks
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def bank_edit(request):
    try:
        id = request.POST['id']

        banks = Bank.objects.get(id=id)

        return JsonResponse({
            "status_code" : 200,
            "message" : "data fetch successfully",
            "banks" : {
                'id' : banks.id,
                'user' : banks.user,
                'email' : banks.email,
                'user_id' : banks.user_id,
                'ac_no' : banks.ac_no,
                'phone_no' : banks.phone_no,
                'ac_type' : banks.ac_type,
                'home' : banks.home,
                'pics' : banks.pics.url
            }
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })                
@csrf_exempt
def account_update(request):
    try:
        if request.method == "POST":
                id = request.POST['id']
                user = request.POST['user']
                email = request.POST['email']
                ph_no = request.POST['ph_no']
                ac_no = request.POST['ac_no']
                user_id = request.POST['user_id']
                home = request.POST['home']
                ac_type = request.POST['ac_type']
                pics = request.FILES.get('pics')

                if pics:
                    upload_dir = os.path.join(settings.BASE_DIR,"static","pics/"+email)

                    os.makedirs(upload_dir,exist_ok=True)

                    file_path = os.path.join(upload_dir,pics.name)

                    with open(file_path,"wb+") as destination:
                        for chunk in pics.chunks():
                            destination.write(chunk)

                banks = Bank.objects.get(id = id)

                banks.user = user
                banks.email = email
                banks.user_id = user_id
                banks.ac_no = ac_no
                banks.phone_no = ph_no
                banks.home = home
                banks.ac_type = ac_type
                banks.pics = pics
                banks.save()

                return JsonResponse({
                    "status_code" : 200,
                    "message" : "updated successfully"
                })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def bank_delete(request):
    try:
        if request.method == "POST":
            id = request.POST['id']

            bank = Bank.objects.get(id=id)

            bank.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "Deleted Successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def create_transaction(request):
    return render(request,'table1/banking/create.html')
@csrf_exempt
def create_transaction_view(request):
    try:
        if request.method == "POST":
            name = request.POST['name']
            ac_no = request.POST['ac_no']
            credit = request.POST['credit']
            debit = request.POST['debit']
            balance = request.POST['balance']
            mode = request.POST['mode']
            time = request.POST['time']

            Banking.objects.create(
                name = name,
                ac_no = ac_no,
                credit = credit,
                debit = debit,
                balance = balance,
                mode = mode,
                time = time,
                status = "Active"
            )

            return JsonResponse({
                "status_code" : 200,
                "message" : "created"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def trans_list(request):
    return render(request,'table1/banking/list.html')    
@csrf_exempt
def trans_list_view(request):
    try:
        trans = list(Banking.objects.values(
            'id',
            'name',
            'ac_no',
            'credit',
            'debit',
            'balance',
            'mode',
            'time'
        ))
        return JsonResponse({
            "status_code" : 200,
            "message" : "get successfully",
            "trans" : trans
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def delete_transaction(request):
    try:
        if request.method == "POST":
            id = request.POST['id']

            transaction = Banking.objects.get(id=id)

            transaction.delete()

            return JsonResponse({
                   "status_code" : 200,
                    "message" : "delete successfully",                       
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def edit_transaction(request):
    try:
        if request.method == "POST":
            id = request.POST['id']

            transaction = Banking.objects.get(id=id)

            return JsonResponse({
                "status_code" : 200,
                "message" : " data get successfully",
                "transaction" : {
                    'id' : transaction.id,
                    'name' : transaction.name,
                    'ac_no' : transaction.ac_no,
                    'credit' : transaction.credit,
                    'debit' : transaction.debit,
                    'mode' : transaction.mode,
                    'balance' : transaction.balance,
                    'time' : transaction.time,
                }
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def trans_update(request):
    try:
        if request.method == "POST":
            id = request.POST['id']
            name = request.POST['name']
            ac_no = request.POST['ac_no']
            credit = request.POST['credit']
            debit = request.POST['debit']
            balance = request.POST['balance']
            mode = request.POST['mode']
            time = request.POST['time']

            transction = Banking.objects.get(id=id)
            
            transction.name = name
            transction.ac_no = ac_no
            transction.credit = credit
            transction.debit = debit
            transction.balance = balance
            transction.mode = mode
            transction.time = time

            transction.save()

            return JsonResponse({
                "status_code" : 200,
                "message" : "updated successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def register(request):
    return render(request,'table1/register/create.html')    
@csrf_exempt
def register_view(request):
    try:
        if request.method == "POST":
            name = request.POST['name']
            email = request.POST['email']
            gender = request.POST['gender']
            dob = request.POST['dob']
            mob_no = request.POST['mob_no']
            city = request.POST['city']
            dist = request.POST['dist']
            state = request.POST['state']
            country = request.POST['country']
            pic = request.FILES.get('pic')

            if Register.objects.filter(email=email).exists():
                return JsonResponse({
                    "status_code" : 409,
                    "message" : "email already exists"
                })

            if pic:

                upload_dir = os.path.join(settings.BASE_DIR,"static","pic/" + email)
                os.makedirs(upload_dir,exist_ok=True)
                file_path = os.path.join(upload_dir,pic.name)

                with open(file_path,"wb+")as destination:
                    for chunk in pic.chunks():
                        destination.write(chunk)

            Register.objects.create(
                name= name,
                email = email,
                gender = gender,
                dob = dob,
                mob_no = mob_no,
                city = city,
                dist = dist,
                state = state,
                country = country,
                pic = pic.name
            )
            return JsonResponse({
                "status_code" : 200,
                'message' : "register successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
      return JsonResponse({
        "status_code" : 500,
        "message" : str(e)
      })
def register_list(request):
    return render(request,'table1/register/list.html')
@csrf_exempt
def register_list_view(request):
    try:
        if request.method == "GET":

            registers = list(Register.objects.values(
                'id',
                'name',
                'email',
                'gender',
                'dob',
                'mob_no',
                'city',
                'dist',
                'state',
                'country',
                'pic'
            ))
            return JsonResponse({
                "status_code" : 200,
                "message" : "data get successfully",
                "registers" : registers
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def register_edit(request):
    try:
        if request.method == "POST":
            id = request.POST['id']

            registers = Register.objects.get(id=id)

            return JsonResponse({
                "status_code" :200,
                "message" : "data get successfully",
                "registers" : {
                    'id' : registers.id,
                    'name' : registers.name,
                    'email' : registers.email,
                    'gender' : registers.gender,
                    'dob' : registers.dob,
                    'mob_no' : registers.mob_no,
                    'city' : registers.city,
                    'dist' : registers.dist,
                    'state' : registers.state,
                    'country' : registers.country,
                    'pic' : registers.pic.url
                }
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        }) 
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def register_delete(request):
    try:
        if request.method == "POST":
            id = request.POST['id']
            print("id:",id)

            register = Register.objects.get(id=id)

            register.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "data deleted successfully",
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
            return JsonResponse({
                "status_code" : 500,
                "message" : str(e)
            })
@csrf_exempt
def register_update_view(request):
    try:
        if request.method == "POST":
            id = request.POST['id']
            name = request.POST['name']
            email = request.POST['email']
            gender = request.POST['gender']
            dob = request.POST['dob']
            mob_no = request.POST['mob_no']
            city = request.POST['city']
            dist = request.POST['dist']
            state = request.POST['state']
            country = request.POST['country']
            pic = request.FILES.get('pic')

            if pic:
                upload_dir = os.path.join(settings.BASE_DIR,"static","pic/"+email)
                os.makedirs(upload_dir,exist_ok=True)
                file_path = os.path.join(upload_dir,pic.name)

                with open(file_path,"wb+")as destination:
                    for chunk in pic.chunks():
                        destination.write(chunk)
            register = Register.objects.get(id=id)

            register.name = name
            register.email = email
            register.gender = gender
            register.dob = dob
            register.mob_no = mob_no
            register.city = city
            register.dist = dist
            register.state = state
            register.country = country
            register.pic = pic.name

            register.save()

            return JsonResponse({
                "status_code" : 200,
                "message" : "updated successfully"
            })
        return JsonResponse({
            "status_code" : 500,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def register_login(request):
    return render(request,'table1/register/login.html')    
@csrf_exempt
def register_login_validate(request):
    try:
        if request.method == "POST":
            name = request.POST['name']
            password = request.POST['password']

            user = Register.objects.filter(name=name,dob=password).first()

            if not user:
                return JsonResponse({
                    "status_code" : 400,
                    "message" : "Invalid username and password"
                })
            request.session['user_id'] = user.id

            return JsonResponse({
                "status_code" : 200,
                "message" : "login successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def bank_login(request):
    return render(request,'table1/bank/login.html')
@csrf_exempt
def bank_login_validate(request):
    try:
        if request.method == "POST":
            user_id = request.POST['user_id']
            password = request.POST['password']

            user = Bank.objects.filter(Q(user_id=user_id)|Q(phone_no=password)).first()
            if not user:
                return JsonResponse({
                    "status_code" : 400,
                    "message" : "invalid user id or password"
                })

            request.session['user_id']= user.id
            return JsonResponse({
                "status_code" : 200,
                "message" : "login successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def biodata_login(request):
    return render(request,'table1/biodata/login.html')
@csrf_exempt
def biodata_login_validate(request):
    try:
        if request.method == "POST":
            name = request.POST['name']
            password = request.POST['password']

            user = Biodata.objects.filter(b_name= name,b_dob=password).first()
            
            if not user:
                user = Biodata.objects.filter(b_city= name,b_dob= password).first()
            if not user :
                return JsonResponse({
                    "status_code" : 400,
                    "message" : "invalid username and password"
                })    
            
            request.session['user_id'] = user.id
            return JsonResponse({
                            "status_code" : 200,
                            "message" : "login successfully"
                        })
        return JsonResponse({
                "status_code" : 405,
                "message" : "method not allowed"
        })
    except Exception as e:
            return JsonResponse({
                        "status_code" : 500,
                        "message" : str(e)
            })
def employee_login(request):
    return render(request,'table1/employee/login.html')
def shop_regd(request):
    return render(request,'table1/details/register.html')
@csrf_exempt
def shop_regd_views(request):
    try:
        if request.method == "POST":
            name = request.POST['name']
            email = request.POST['email']
            palce = request.POST['place']
            shirt = request.POST['shirt']
            pant = request.POST['pant']
            dress = request.POST['dress']

            Shop.objects.create(
                name= name,
                email= email,
                place = palce,
                shirt = shirt,
                pant = pant,
                dress = dress
            )
            return JsonResponse({
                "status_code" : 200,
                "message" : "registered Successfully"
            })
        return JsonResponse({
            'status_code': 405,
            "message":"method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def shop_list(request):
    return render(request,'table1/details/table.html')
@csrf_exempt
def shop_list_view(request):
    try:
        if request.method == "GET":
            lists = list(Shop.objects.values(
                'id',
                'name',
                'email',
                'place',
                'shirt',
                'pant',
                'dress',                
            ))
            return JsonResponse({
                "status_code" : 200,
                "message" : "get successfully",
                "lists" : lists
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
@csrf_exempt
def shop_delete(request):
    try:
        if request.method == "POST":
            id = request.POST['id']

            shop = Shop.objects.get(id= id)

            shop.delete()

            return JsonResponse({
                "status_code" : 200,
                "message" : "deleted successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })
def edit_shop(request):
    return render(request,"table1/details/edit.html")
@csrf_exempt
def edit_shop_view(request):
    try:
        if request.method == "POST":
            id = request.POST['id']
            shops = Shop.objects.get(id= id)

            return JsonResponse({
                "status_code" : 200,
                "message" : "fetch successfully",
                "shops" :{
                    'id': shops.id,
                    'name' : shops.name,
                    'email' : shops.email,
                    'place' : shops.place,
                    'shirt' : shops.shirt,
                    'pant' : shops.pant,
                    'dress' : shops.dress
                }
            })

    except Exception as e :
        return JsonResponse({
            "status_code" : 500,
            "message" :str(e)
        })
@csrf_exempt
def shop_update(request):
    try:
        if request.method == "POST":
            id = request.POST['id']
            name = request.POST['name']
            email = request.POST['email']
            place = request.POST['place']
            shirt = request.POST['shirt']
            pant = request.POST['pant']
            dress = request.POST['dress']

            shop = Shop.objects.get(id= id)

            shop.name = name
            shop.email = email
            shop.place = place
            shop.shirt = shirt
            shop.pant = pant
            shop.dress = dress

            shop.save()
            return JsonResponse({
                "status_code" : 200,
                "message"  : "updated successfully"
            })
        return JsonResponse({
            "status_code" : 405,
            "message" : "method not allowed"
        })
    except Exception as e:
        return JsonResponse({
            "status_code" : 500,
            "message" : str(e)
        })


       

                                    


                              