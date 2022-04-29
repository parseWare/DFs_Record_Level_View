from dfs_app.models import Dfs_model_covid, Dfs_model_custom
import csv;


def insertRec(rec):
    # print('in')
    name,roll,img,city,contact=rec[0],rec[1],rec[2],rec[3],rec[4]
    row_data = Dfs_model_custom(name=name,roll_no=roll,image=img,city=city,contact=contact)
    row_data.save()
    print('done')

def insertRecCsv(csv_file):

    recLst=[]

    with open(csv_file) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        recLst=[row for row in csv_reader]

    for ls in recLst:
        timestamp,patient_id,sample_id,country,site_id=ls[0],ls[1],ls[2],ls[3],ls[4]
        row_data = Dfs_model_covid(timestamp=timestamp,patient_id=patient_id,sample_id=sample_id,country=country,site_id=site_id)
        row_data.save()
        # print('done')