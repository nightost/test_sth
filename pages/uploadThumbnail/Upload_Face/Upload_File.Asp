<%
Dim temp
dim temp1
Dim temp2
Dim temp3
savePath = "../UploadFile/"  '�洢·��
savePicName = ToUnixTime()  '�洢ͼƬ����
'�����趨��ͼƬ���Ⱥ͸߶�
pic1_name=request.Form("pic1_name")
pic2_name=request.Form("pic2_name")
pic3_name=request.Form("pic3_name")
if pic1_name="" then pic1_name="" end if
if pic2_name="" then pic2_name="" end if
if pic3_name="" then pic3_name="" end if
'���ñ���·�����ļ���
file_src = savePath&savePicName&".jpg"
file_pic1 = savePath&savePicName&"_"&pic1_name&".jpg"
file_pic2 = savePath&savePicName&"_"&pic2_name&".jpg"
file_pic3 = savePath&savePicName&"_"&pic3_name&".jpg"

'����ͼƬ����
src_pic= request.Form("pic")
src_pic1 = request.Form("pic1")
src_pic2 = request.Form("pic2")
src_pic3 = request.Form("pic3")
'�ж�ԭͼ�Ƿ����ϴ�
if src_pic=""  Then
Else
src_data = base64Decode(src_pic)
call Save2Local(src_data,server.MapPath(file_src))
end If
'�����ͷ��
if src_pic1=""  Then
Else
pic1_data = base64Decode(src_pic1)
call Save2Local(pic1_data,server.MapPath(file_pic1))
end If
'������ͷ��
if src_pic2=""  Then
Else
pic2_data = base64Decode(src_pic2)
call Save2Local(pic2_data,server.MapPath(file_pic2))
end If
'����Сͷ��
if src_pic3=""  Then
Else
pic3_data = base64Decode(src_pic3)
call Save2Local(pic3_data,server.MapPath(file_pic3))
end If

'''''''''''''''''''''''''''''
'ͷ�񱣴�ɹ��󣬴����Լ����߼��ж�
'�����û�ID ����Ҫ�ߴ��ͷ���ļ���ַд�����ݿ�
'''''''''''''''''''''''''''''

'��������
Response.write("{""status"":1,""picUrl"":"""&savePath&savePicName&"""}")


function Save2Local(imgs,tofile) 
Set objStream = Server.CreateObject("ADODB.Stream") 
objStream.Type =1 
objStream.Open 
objstream.write imgs 
objstream.SaveToFile tofile,2 
objstream.Close() 
set objstream=nothing 
end function 

Function ToUnixTime()
	strTime = Now()
	intTimeZone = +8
    If IsEmpty(strTime) or Not IsDate(strTime) Then strTime = Now        
    If IsEmpty(intTimeZone) or Not isNumeric(intTimeZone) Then intTimeZone = 0        
     ToUnixTime = DateAdd("h",-intTimeZone,strTime)        
     ToUnixTime = DateDiff("s","1970-1-1 0:0:0", ToUnixTime)        
End Function       


 function Base64Encode(strData)
    dim objAds,objXd
    set objAds=createobject("adodb.stream")
    objAds.Type=2
    objAds.charset="unicode"
    objAds.mode=3
    call objAds.open()
    objAds.writeText strData
    objAds.Position=0
    objAds.Type=1
    'objAds.Position=2
 
    set objXd=createobject("msxml.domdocument")
    call objXd.loadXml("<root/>")
    objXd.DocumentElement.DataType="bin.base64"
    objXd.DocumentElement.NodeTypedValue=objAds.read()
    Base64Encode=objXd.DocumentElement.text
end function
 
function Base64Decode(strData)
    dim objXd
    set objXd=createobject("msxml.domdocument")
    call objXd.loadXml("<root/>")
    objXd.DocumentElement.DataType="bin.base64"
    objXd.DocumentElement.text=strData
    Base64Decode=objXd.DocumentElement.NodeTypedValue
end function
%>