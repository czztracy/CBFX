/**
 * 调用usbkey进行签名
 * @param certid 证书ID
 * @param message 待签的PDF hash
 * @returns {*}
 */
export function qdca_signByUK(certid, message, CASecurityClient) {
  CASecurityClient.SOF_SetInParaEncodingMode(1)
  const signature = CASecurityClient.SOF_SignData(certid, message)
  if (CASecurityClient.SOF_GetLastError() !== 0) {
    switch (CASecurityClient.SOF_GetLastError()) {
    case 0x0B000201:
      alert('数字签名失败，参数输入有误，请确认输入口令是否正确')
      break
    case 0x0B000200:
      alert('数字签名失败，参数输入有误，请确认输入数据的有效性')
      break
    case 0x0B000310:
      alert('数字签名失败，未找到指定证书，请确认USBKey是否插入或重新插拔USBKey后重试')
      break
    case 0x0B000309:
      alert('数字签名失败，未找到指定证书私钥容器，请确认USBKey是否插入或重新插拔USBKey后重试')
      break
    case 0x0B000301:
      alert('数字签名失败，创建数字指纹句柄失败，请关闭页面后重试')
      break
    case 0x0B000302:
      alert('数字签名失败，生成数字指纹失败，请关闭页面后重试')
      break
    case 0x0B000409:
      alert('数字签名失败，请关闭页面后重试')
      break
    default:
      alert('数字签名失败，未知错误，错误码为：' + CASecurityClient.SOF_GetLastError())
      break
    }
  }
  return signature
}
/**
 * 获取客户证书
 * @param certid 证书ID
 * @returns {*}
 */
export function qdca_getclientcert(certid, CASecurityClient) {
  const clientcert = CASecurityClient.SOF_ExportUserCert(certid)
  if (clientcert === '') {
    alert('获取证书失败，错误码为：' + CASecurityClient.SOF_GetLastError().toString(16))
    return
  }
  return clientcert
}
/**
 * 获取usbkey的电子印章图片
 * @param certid   证书ID
 * @returns {*}
 */
export function qdca_getSealData(certid, CASecurityClient) {
  const picdata = CASecurityClient.SOF_ShowSealData(certid, 101, 0)
  if (picdata === '') {
    switch (CASecurityClient.SOF_GetLastError()) {
    case 0X0B000001:
      alert('返回印章信息失败，KEY中印章文件有误，请确认是否插入正确的KEY，重试后仍出现此错误请与管理员联系')
      break
    case 0X0B000003:
      alert('返回印章信息失败，该KEY无印章信息，请确认是否插入正确的KEY，重试后仍出现此错误请与管理员联系')
      break
    case 0x0B000200:
      alert('返回印章信息失败，参数输入长度有误，请确认输入数据的有效性')
      break
    case 0x0B000201:
      alert('返回印章信息失败，参数输入有误，请确认输入数据的有效性')
      break
    case 0X0B000404:
      alert('返回印章信息失败，没有检索到指定印章信息，请确认是否插入正确的KEY，重试后仍出现此错误请与管理员联系')
      break
    case 0X0B000419:
      alert('返回印章信息失败，印章索引号暂不支持，请重新输入')
      break
    case 0X0B000425:
      alert('返回印章信息失败，请确认输入口令是否正确')
      break
    default:
      alert('返回印章信息失败，未知错误，错误码为：' + CASecurityClient.SOF_GetLastError().toString(16))
      break
    }
    return
  }
  return picdata
}
/**
 * 获取usbkey的V码，用于当前的UK使用者与当前系统的登录者进行匹配
 * @param clientcert  客户证书
 * @returns {*}
 */
export function qdca_getvcode(clientcert, CASecurityClient) {
  const vcode = CASecurityClient.SOF_GetCertInfoByOid(clientcert, '1.2.156.112571.532.1.2')
  if (vcode == null || vcode === '') {
    alert('获取UK扩展值企业V码失败，未知错误，错误码为：' + CASecurityClient.SOF_GetLastError().toString(16))
    return
  }
  return vcode
}
/**
 * 获取usbkey的证书名称，用于当前的UK使用者与当前系统的登录者进行匹配
 * @param clientcert  客户证书
 * @returns {*}
 */
export function qdca_getcn(clientcert, CASecurityClient) {
  const cn = CASecurityClient.SOF_GetCertInfo(clientcert, parseInt('0x00000017', 0))
  if (cn == null || cn === '') {
    alert('获取证书名称失败，未知错误，错误码为：' + CASecurityClient.SOF_GetLastError().toString(16))
    return
  }
  return cn
}
