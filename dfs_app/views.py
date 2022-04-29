from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db.models import Q

from dfs_app.models import Dfs_model_custom, Dfs_model_covid
from dfs_app.utility import insertRec,insertRecCsv
# Create your views here.

def get_record(request, tab, id):
    print('REQUEST RECORD: ',request.path)
    req_path=request.path
    model_name=req_path.split('/')[1]

    rec=''
    if model_name=='dfs_app_dfs_model_custom':
        rec = list(Dfs_model_custom.objects.filter(id=id).values())
        html = "<html>Hello_record</html>"
        # return HttpResponse(html)
        # return render(request, 'display.html', {'lst' : rec})
        return JsonResponse(rec, safe=False)
    else:
        rec=list(Dfs_model_covid.objects.filter(id=id).values())
        html = "<html>Hello_record</html>"
        # return HttpResponse(html)
        # return render(request, 'display_covid.html', {'lst' : rec})
        return JsonResponse(rec, safe=False)
    

def get_table(request, tab):
    # return render(request, 'result.html', {'para' : para})
    req_path=request.path
    model_name=req_path.split('/')[1]

    rec=''
    if model_name=='dfs_app_dfs_model_custom':
        rec = list(Dfs_model_custom.objects.all().values())
        html = "<html>Hello_record</html>"
        # return render(request, 'display.html', {'lst' : rec, 'cnt': range(len(rec[0]))})
        return JsonResponse(rec, safe=False)
    else:
        rec=list(Dfs_model_covid.objects.all().values())
        html = "<html>Hello_record</html>"
        # return render(request, 'display_covid.html', {'lst' : rec, 'cnt': range(len(rec[0]))})
        return JsonResponse(rec, safe=False)
    

def insert_rec(request):
    # print('in views')
    path='images'
    record = [['Parth',123,path+'/1.jpeg','Jpr',9273],['Abhisek',456,path+'/2.jpeg','Bnglr',9254],['Paras',789,path+'/3.jpeg','Pilani',9243],['Purorapatra',234,path+'/4.jpeg','Hyd',9243],['Naranambi',910,path+'/5.jpeg','Hyd',9254]]
    # record=[['Abhijeet',874,'bsd.jpg','Kanpur',8609]]
    for rec in record:
        insertRec(rec)

    html = "<html>Record Inserted!</html>"
    return HttpResponse(html)

def insert_rec_csv(request):

    path='./411_patient_data.csv'

    insertRecCsv(path)

    html = "<html>Record Inserted!</html>"
    return HttpResponse(html)