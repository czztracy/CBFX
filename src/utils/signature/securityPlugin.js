export function Security(obj) {
  this.obj = obj

  this.SAR_OK										=	0
  this.SAR_FALSE									= 	1

  this.SGD_CERT_VERSION							=	0x00000001
  this.SGD_CERT_SERIAL							= 	0x00000002
  this.SGD_CERT_ISSUE								= 	0x00000005
  this.SGD_CERT_VALID_TIME						= 	0x00000006
  this.SGD_CERT_SUBJECT							= 	0x00000007
  this.SGD_CERT_DER_PUBLIC_KEY					= 	0x00000008
  this.SGD_CERT_DER_EXTENSIONS					= 	0x00000009
  this.SGD_CERT_ISSUER_CN							= 	0x00000021
  this.SGD_CERT_ISSUER_O							= 	0x00000022
  this.SGD_CERT_ISSUER_OU							= 	0x00000023
  this.SGD_CERT_SUBJECT_CN						= 	0x00000031
  this.SGD_CERT_SUBJECT_O							= 	0x00000032
  this.SGD_CERT_SUBJECT_OU						= 	0x00000033
  this.SGD_CERT_SUBJECT_EMALL						= 	0x00000034

  this.TRUE										=	1
  this.FALSE										=	0

  this.PFX										=	0
  this.SIM										=	1
  this.K5											=	2

  var g_securityPlugin = null

  if (isMobile()) {
    window.onload = function() {
      window.location = 'app://com.sdca.securityserver/console?mode=' + httpd + '&state=' + start
    }
  }

  function isMobile() {
    var browser = {
      versions: (function() {
        var u = navigator.userAgent, app = navigator.appVersion
        return {
          trident: u.indexOf('Trident') > -1, // IE
          other: u.indexOf('Trident') === -1
        }
      }()),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.trident || browser.versions.other) {
      if (g_securityPlugin == null) {
        if (browser.versions.trident) {	// IE
          g_securityPlugin = new ActiveXObject('SDCASecurityClient.CASecurityClient.1')
        } else {
          g_securityPlugin = new securityPlugin()
        }
      }
      return true
    } else {
      return false
    }
  }

  this.SOF_GetUserList = function() {
    if (g_securityPlugin == null) {
      return null
    }

    return g_securityPlugin.SOF_GetUserList()
  }
  this.SOF_ExportUserCert = function(CertID) {
    if (g_securityPlugin == null) {
      return null
    }

    return g_securityPlugin.SOF_ExportUserCert(CertID)
  }

  this.SOF_GetCertInfo = function(Base64EncodeCert, Type) {
    if (g_securityPlugin == null) {
      return null
    }

    return g_securityPlugin.SOF_GetCertInfo(Base64EncodeCert, Type)
  }

  this.SOF_Login = function(medium, PassWd) {
    if (g_securityPlugin == null) {
      return -1
    }

    return g_securityPlugin.SOF_Login(medium, PassWd)
  }

  this.SOF_SignData = function(CertID, InData) {
    if (g_securityPlugin == null) {
      return -1
    }

    return g_securityPlugin.SOF_SignData(CertID, InData)
  }
  this.SOF_SignDataByP7 = function(CertID, InData) {
    if (g_securityPlugin == null) {
      return -1
    }

    return g_securityPlugin.SOF_SignDataByP7(CertID, InData)
  }

  this.SOF_VerifySignedData = function(Base64EncodeCert, InData, SignedValue) {
    if (g_securityPlugin == null) {
      return -1
    }
    var obj = g_securityPlugin.SOF_VerifySignedData(Base64EncodeCert, InData, SignedValue)
    return obj
  }

  this.SOF_GetLastError = function() {
    if (g_securityPlugin == null) {
      return -1
    }

    return g_securityPlugin.SOF_GetLastError()
  }
  this.SOF_HashData = function(InData) {
    if (g_securityPlugin == null) {
      return -1
    }

    return g_securityPlugin.SOF_HashData(InData)
  }
  this.SOF_GetTempPath = function() {
    if (g_securityPlugin == null) {
      return -1
    }

    return g_securityPlugin.SOF_GetTempPath()
  }
  this.SOF_VerifySignedDataByP7 = function(InData) {
    if (g_securityPlugin == null) {
      return -1
    }

    return g_securityPlugin.SOF_VerifySignedDataByP7(InData)
  }
  this.SOF_ShowSeal = function(CertID, SealIndex, SealFilePath, RGBFlag) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_ShowSeal(CertID, SealIndex, SealFilePath, RGBFlag)
  }
  this.SOF_ShowSealData = function(CertID, SealIndex, RGBFlag) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_ShowSealData(CertID, SealIndex, RGBFlag)
  }
  this.SOF_InitialVar = function(SectionName, KeyName, ProfileString) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_InitialVar(SectionName, KeyName, ProfileString)
  }
  this.SOF_DecodeP7EnvelopedData = function(CertID, InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_DecodeP7EnvelopedData(CertID, InData)
  }
  this.SOF_EncodeP7EnvelopedData = function(Base64EncodeCert, InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_EncodeP7EnvelopedData(Base64EncodeCert, InData)
  }
  this.SOF_GetP7SignDataInfo = function(P7Data, Type) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetP7SignDataInfo(P7Data, Type)
  }
  this.SOF_GetVersion = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetVersion()
  }
  this.SOF_SetSignMethod = function(SignMethod) {
	  	if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SetSignMethod(SignMethod)
  }
  this.SOF_GetSignMethod = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetSignMethod()
  }
  this.SOF_MakeSeal = function(SealMainText, SealFilePath, SealIndex, RGBFlag) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_MakeSeal(SealMainText, SealFilePath, SealIndex, RGBFlag)
  }
  this.SOF_SetEncryptMethod = function(EncryptMethod) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SetEncryptMethod(EncryptMethod)
  }
  this.SOF_GetEncryptMethod = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetEncryptMethod()
  }

  this.SOF_ChangePassWd = function(CertID, OldPassWd, NewPassWd) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_ChangePassWd(CertID, OldPassWd, NewPassWd)
  }
  this.SOF_ExportExChangeUserCert = function(CertID) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_ExportExChangeUserCert(CertID)
  }
  this.SOF_GetCertInfoByOid = function(Cert, Oid) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetCertInfoByOid(Cert, Oid)
  }
  this.SOF_GetUserInfo = function(CertID, Type) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetUserInfo(CertID, Type)
  }
  this.SOF_ValidateCert = function(Cert) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_ValidateCert(Cert)
  }
  this.SOF_SignFile = function(CertID, InFile) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SignFile(CertID, InFile)
  }
  this.SOF_VerifySignedFile = function(CertID, InFile, SignValue) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_VerifySignedFile(CertID, InFile, SignValue)
  }
  this.SOF_EncryptData = function(Key, InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_EncryptData(Key, InData)
  }
  this.SOF_DecryptData = function(Key, InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_DecryptData(Key, InData)
  }
  this.SOF_EncryptFile = function(SymmKey, InFile, OutFile) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_EncryptFile(SymmKey, InFile, OutFile)
  }
  this.SOF_DecryptFile = function(SymmKey, InFile, OutFile) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_DecryptFile(SymmKey, InFile, OutFile)
  }
  this.SOF_PubKeyEncrypt = function(Cert, InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_PubKeyEncrypt(Cert, InData)
  }
  this.SOF_PriKeyDecrypt = function(CertID, InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_PriKeyDecrypt(CertID, InData)
  }
  this.SOF_SignDataXML = function(CertID, InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SignDataXML(CertID, InData)
  }
  this.SOF_VerifySignedDataXML = function(InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_VerifySignedDataXML(InData)
  }
  this.SOF_GetXMLSignatureInfo = function(XMLSignedData, type) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetXMLSignatureInfo(XMLSignedData, type)
  }
  this.SOF_CheckSupport = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_CheckSupport()
  }
  this.SOF_EncodeP7EnvelopedFile = function(Base64EncodeCert, InFile, OutFile) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_EncodeP7EnvelopedFile(Base64EncodeCert, InFile, OutFile)
  }
  this.SOF_DecodeP7EnvelopedFile = function(CertID, InFile, OutFile) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_DecodeP7EnvelopedFile(CertID, InFile, OutFile)
  }
  this.SOF_GetDevState = function(DevName) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetDevState(DevName)
  }
  this.SOF_GetSystemPath = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetSystemPath()
  }
  this.SOF_HashFile = function(InFile) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_HashFile(InFile)
  }
  this.SOF_SetEncodingMode = function(encodingMode) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SetEncodingMode(encodingMode)
  }
  this.SOF_GetEncodingMode = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetEncodingMode()
  }
  this.SOF_SetRefEncodingMode = function(encodingMode) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SetRefEncodingMode(encodingMode)
  }
  this.SOF_GetRefEncodingMode = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SetRefEncodingMode(encodingMode)
  }
  this.SOF_SetDetachedMode = function(SignatureMode) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SetDetachedMode(SignatureMode)
  }
  this.SOF_GetRefEncodingMode = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetRefEncodingMode()
  }
  this.SOF_VerifyDetachedSignedDataByP7 = function(P7Data, InData) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_VerifyDetachedSignedDataByP7(P7Data, InData)
  }
  this.SOF_SetEndianMode = function(EndianMode) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SetEndianMode(EndianMode)
  }
  this.SOF_GetEndianMode = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetEndianMode()
  }
  this.SOF_SetInParaEncodingMode = function(encodingMode) {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_SetInParaEncodingMode(encodingMode)
  }
  this.SOF_GetInParaEncodingMode = function() {
    if (g_securityPlugin == null) {
      return -1
    }
    return g_securityPlugin.SOF_GetInParaEncodingMode()
  }
}

function createXMLHttpRequest() {
  var xmlHttp
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest()
  } catch (e) {
    return false
  }
  return xmlHttp
}

function securityPlugin() {
  var url = 'http://127.0.0.1:8222'
  var xmlhttp
  function AjaxIO(json) {
    if (xmlhttp == null) {
      xmlhttp = createXMLHttpRequest()
    }
    // xmlhttp.setTimeout(function(){
    //   	return -3;
    //  },2000,null);
    xmlhttp.open('POST', url, false)
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xmlhttp.send(json)
  }
  function GetResponse(json) {
    try {
      AjaxIO(json)
    } catch (e) {
      return -3
    }
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var obj = xmlhttp.responseText
      return obj
    } else {
      return null
    }
  }

  this.SOF_GetUserList = function() {
    var json = '{"Function":"SOF_GetUserList"}'
    return GetResponse(json)
  }

  this.SOF_ExportUserCert = function(CertID) {
    var json = '{"Function":"SOF_ExportUserCert",  "CertID":"' + CertID + '"}'
    return GetResponse(json)
  }

  this.SOF_GetCertInfo = function(Base64EncodeCert, Type) {
    var json = '{"Function":"SOF_GetCertInfo", "Cert":"' + Base64EncodeCert + '", "Type":' + Type + '}'
    return GetResponse(json)
  }

  this.SOF_SignData = function(CertID, InData) {
    var json = '{"Function":"SOF_SignData",   "CertID":"' + CertID + '", "InData":"' + InData + '"}'
    return GetResponse(json)
  }

  this.SOF_VerifySignedData = function(Base64EncodeCert, InData, SignedValue) {
    var json = '{"Function":"SOF_VerifySignedData", "Cert":"' + Base64EncodeCert + '", "InData":"' + InData + '", "SignValue":"' + SignedValue + '"}'
    return GetResponse(json)
  }

  this.SOF_SignDataByP7 = function(CertID, InData) {
    var json = '{"Function":"SOF_SignDataByP7",   "CertID":"' + CertID + '", "InData":"' + InData + '"}'
    return GetResponse(json)
  }

  this.SOF_VerifySignedDataByP7 = function(InData) {
    var json = '{"Function":"SOF_VerifySignedDataByP7",  "P7Data":"' + InData + '"}'
    return GetResponse(json)
  }

  this.SOF_GetP7SignDataInfo = function(P7Data, Type) {
    var json = '{"Function":"SOF_GetP7SignDataInfo",  "P7Data":"' + P7Data + '" ,"Type":' + Type + '}'
    return GetResponse(json)
  }

  this.SOF_GetLastError = function() {
    var json = '{"Function":"SOF_GetLastError"}'

    return parseInt(GetResponse(json), 16)
  }

  this.SOF_EncodeP7EnvelopedData = function(Base64EncodeCert, InData) {
    var json = '{"Function":"SOF_EncodeP7EnvelopedData",   "Base64EncodeCert":"' + Base64EncodeCert + '", "InData":"' + InData + '"}'
    return GetResponse(json)
  }

  this.SOF_DecodeP7EnvelopedData = function(CertID, InData) {
    var json = '{"Function":"SOF_DecodeP7EnvelopedData",   "CertID":"' + CertID + '", "InData":"' + InData + '"}'
    return GetResponse(json)
  }

  this.SOF_InitialVar = function(SectionName, KeyName, ProfileString) {
    var json = '{"Function":"SOF_InitialVar",   "SectionName":"' + SectionName + '", "KeyName":"' + KeyName + '", "ProfileString":"' + ProfileString + '"}'
    return GetResponse(json)
  }

  this.SOF_ShowSeal = function(CertID, SealIndex, SealFilePath, RGBFlag) {
    var json = '{"Function":"SOF_ShowSeal",  "CertID":"' + CertID + '" ,"SealIndex":' + SealIndex + ',"SealFilePath":"' + SealFilePath + '","RGBFlag":' + RGBFlag + '}'
    return GetResponse(json)
  }
  this.SOF_ShowSealData = function(CertID, SealIndex, RGBFlag) {
    var json = '{"Function":"SOF_ShowSealData",  "CertID":"' + CertID + '" ,"SealIndex":' + SealIndex + ',"RGBFlag":' + RGBFlag + '}'
    return GetResponse(json)
  }
  this.SOF_GetTempPath = function() {
    var json = '{"Function":"SOF_GetTempPath"}'
    return GetResponse(json)
  }

  this.SOF_HashData = function(InData) {
    var json = '{"Function":"SOF_HashData", "InData":"' + InData + '"}'
    return GetResponse(json)
  }
  this.SOF_Login = function(User, Psw) {
    var json = '{"Function":"SOF_Login",   "CertID":"' + User + '", "PassWd":"' + Psw + '"}'
    return GetResponse(json)
  }
  this.SOF_GetVersion = function() {
    var json = '{"Function":"SOF_GetVersion"}'
    return GetResponse(json)
  }
  this.SOF_SetSignMethod = function(SignMethod) {
    var json = '{"Function":"SOF_SetSignMethod","SignMethod":' + SignMethod + '}'
    return GetResponse(json)
  }
  this.SOF_GetSignMethod = function() {
    var json = '{"Function":"SOF_GetSignMethod"}'
    return GetResponse(json)
  }
  this.SOF_MakeSeal = function(SealMainText, SealFilePath, SealIndex, RGBFlag) {
    var json = '{"Function":"SOF_MakeSeal","SealFilePath":"' + SealFilePath + '","SealIndex":' + SealIndex + ',"RGBFlag":' + RGBFlag + '}'
    return GetResponse(json)
  }
  this.SOF_SetEncryptMethod = function(EncryptMethod) {
    var json = '{"Function":"SetEncryptMethod","SignMethod":' + EncryptMethod + '}'
    return GetResponse(json)
  }
  this.SOF_GetEncryptMethod = function() {
    var json = '{"Function":"SOF_GetEncryptMethod"}'
    return GetResponse(json)
  }

  this.SOF_ChangePassWd = function(CertID, OldPassWd, NewPassWd) {
    var json = '{"Function":"SOF_ChangePassWd","CertID":"' + CertID + '","OldPassWd":"' + OldPassWd + '","NewPassWd":"' + NewPassWd + '"}'
    return GetResponse(json)
  }
  this.SOF_ExportExChangeUserCert = function(CertID) {
    var json = '{"Function":"SOF_ExportExChangeUserCert","CertID":"' + CertID + '"}'
    return GetResponse(json)
  }
  this.SOF_GetCertInfoByOid = function(Cert, Oid) {
    var json = '{"Function":"SOF_GetCertInfoByOid","Cert":"' + Cert + '","Oid":"' + Oid + '"}'
    return GetResponse(json)
  }
  this.SOF_GetUserInfo = function(CertID, Type) {
    var json = '{"Function":"SOF_GetUserInfo","CertID":"' + CertID + '","Type":' + Type + '}'
    return GetResponse(json)
  }
  this.SOF_ValidateCert = function(Cert) {
    var json = '{"Function":"SOF_ValidateCert","Cert":"' + Cert + '"}'
    return GetResponse(json)
  }
  this.SOF_SignFile = function(CertID, InFile) {
    var json = '{"Function":"SOF_SignFile","CertID":"' + CertID + '","InFile":"' + InFile + '"}'
    return GetResponse(json)
  }
  this.SOF_VerifySignedFile = function(CertID, InFile, SignValue) {
    var json = '{"Function":"SOF_VerifySignedFile","CertID":"' + CertID + '","InFile":"' + InFile + '","SignValue":"' + SignValue + '"}'
    return GetResponse(json)
  }
  this.SOF_EncryptData = function(Key, InData) {
    var json = '{"Function":"SOF_EncryptData","Key":"' + Key + '","InData":"' + InData + '"}'
    return GetResponse(json)
  }
  this.SOF_DecryptData = function(Key, InData) {
    var json = '{"Function":"SOF_DecryptData","Key":"' + Key + '","InData":"' + InData + '"}'
    return GetResponse(json)
  }
  this.SOF_EncryptFile = function(SymmKey, InFile, OutFile) {
    var json = '{"Function":"SOF_EncryptFile","SymmKey":"' + SymmKey + '","InFile":"' + InFile + '","OutFile":"' + OutFile + '"}'
    return GetResponse(json)
  }
  this.SOF_DecryptFile = function(SymmKey, InFile, OutFile) {
    var json = '{"Function":"SOF_DecryptFile","SymmKey":"' + SymmKey + '","InFile":"' + InFile + '","OutFile":"' + OutFile + '"}'
    return GetResponse(json)
  }
  this.SOF_PubKeyEncrypt = function(Cert, InData) {
    var json = '{"Function":"SOF_PubKeyEncrypt","Cert":"' + Cert + '","InData":"' + InData + '"}'
    return GetResponse(json)
  }
  this.SOF_PriKeyDecrypt = function(CertID, InData) {
    var json = '{"Function":"SOF_PriKeyDecrypt","CertID":"' + CertID + '","InData":"' + InData + '"}'
    return GetResponse(json)
  }
  this.SOF_SignDataXML = function(CertID, InData) {
    var json = '{"Function":"SOF_SignDataXML","CertID":"' + CertID + '","InData":"' + InData + '"}'
    return GetResponse(json)
  }
  this.SOF_VerifySignedDataXML = function(InData) {
    var json = '{"Function":"SOF_VerifySignedDataXML","InData":"' + InData + '"}'
    return GetResponse(json)
  }
  this.SOF_GetXMLSignatureInfo = function(XMLSignedData, type) {
    var json = '{"Function":"SOF_GetXMLSignatureInfo","XMLSignedData":"' + XMLSignedData + '","type":' + type + '}'
    return GetResponse(json)
  }
  this.SOF_CheckSupport = function() {
    var json = '{"Function":"SOF_CheckSupport"}'
    return GetResponse(json)
  }
  this.SOF_EncodeP7EnvelopedFile = function(Base64EncodeCert, InFile, OutFile) {
    var json = '{"Function":"SOF_EncodeP7EnvelopedFile","Base64EncodeCert":"' + Base64EncodeCert + '","InFile":"' + InFile + '","OutFile":"' + OutFile + '"}'
    return GetResponse(json)
  }
  this.SOF_DecodeP7EnvelopedFile = function(CertID, InFile, OutFile) {
    var json = '{"Function":"SOF_DecodeP7EnvelopedFile","CertID":"' + CertID + '","InFile":"' + InFile + '","OutFile":"' + OutFile + '"}'
    return GetResponse(json)
  }
  this.SOF_GetDevState = function(DevName) {
    var json = '{"Function":"SOF_GetDevState","DevName":"' + DevName + '"}'
    return GetResponse(json)
  }
  this.SOF_GetSystemPath = function() {
    var json = '{"Function":"SOF_GetSystemPath"}'
    return GetResponse(json)
  }
  this.SOF_HashFile = function(InFile) {
    var json = '{"Function":"SOF_HashFile","InFile":"' + InFile + '"}'
    return GetResponse(json)
  }
  this.SOF_SetEncodingMode = function(encodingMode) {
    var json = '{"Function":"SOF_SetEncodingMode","encodingMode":' + encodingMode + '}'
    return GetResponse(json)
  }
  this.SOF_GetEncodingMode = function() {
    var json = '{"Function":"SOF_GetEncodingMode"}'
    return GetResponse(json)
  }
  this.SOF_SetRefEncodingMode = function(encodingMode) {
    var json = '{"Function":"SOF_SetRefEncodingMode","encodingMode":' + encodingMode + '}'
    return GetResponse(json)
  }
  this.SOF_GetRefEncodingMode = function() {
    var json = '{"Function":"SOF_GetRefEncodingMode"}'
    return GetResponse(json)
  }
  this.SOF_SetDetachedMode = function(SignatureMode) {
    var json = '{"Function":"SOF_SetDetachedMode","SignatureMode":' + SignatureMode + '}'
    return GetResponse(json)
  }
  this.SOF_GetRefEncodingMode = function() {
    var json = '{"Function":"SOF_GetDetachedMode"}'
    return GetResponse(json)
  }
  this.SOF_VerifyDetachedSignedDataByP7 = function(P7Data, InData) {
    var json = '{"Function":"SOF_VerifyDetachedSignedDataByP7","P7Data":"' + P7Data + '","InData":"' + InData + '"}'
    return GetResponse(json)
  }
  this.SOF_SetEndianMode = function(EndianMode) {
    var json = '{"Function":"SOF_SetEndianMode","EndianMode":' + EndianMode + '}'
    return GetResponse(json)
  }
  this.SOF_GetEndianMode = function() {
    var json = '{"Function":"GetEndianMode"}'
    return GetResponse(json)
  }
  this.SOF_SetInParaEncodingMode = function(encodingMode) {
    var json = '{"Function":"SOF_SetInParaEncodingMode","encodingMode":' + encodingMode + '}'
    return GetResponse(json)
  }
  this.SOF_GetInParaEncodingMode = function() {
    var json = '{"Function":"SOF_GetInParaEncodingMode"}'
    return GetResponse(json)
  }
}

// export default {security}
