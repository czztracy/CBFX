// 签章
import request from '@/utils/request'
import { qdca_signByUK, qdca_getclientcert, qdca_getSealData, qdca_getvcode, qdca_getcn } from '@/utils/signature/qdca'
import { Security } from '@/utils/signature/securityPlugin.js'
import { signatureUrl } from '@/utils/api'
// import qs from 'qs'
const djh = '22212712321547'

/**
 * @Page：报价单填报
 * @ApiDesc：校验用户信息并注册签章pdf（接口id149）
 * @UsingRoles：供应商
 * @Author: 王亚迪
 */
export function registerPdf(params) {
  return request({
    url: signatureUrl() + 'file/checkAndRegister',
    method: 'post',
    // params: qs.parse(params),
    data: params
    // responseType: 'blob'
  })
}

// 签章文件
/**
 * @Page：报价单填报
 * @ApiDesc：签章（接口id137）
 * @UsingRoles：供应商
 * @Author: 王亚迪
 */
export function signatureNew(params) {
  return request({
    url: signatureUrl() + 'file/signature',
    method: 'post',
    data: params
  })
}
// 签章V码判断（id147）
// export function check(params) {
//   return request ({
//     url: signatureUrl() + 'file/check',
//     method: 'get',
//     params
//   });
// }
// 签章
// export function sign(pdfUrl, pdfPathDle, reportVersionId, reportId) {
export function sign() {
  // console.log(qdca_signByUK)
  // console.log(new security("Security"))
  let CASecurityClient = {}
  // 1、选择证书
  // try{
  //     CASecurityClient.SOF_GetVersion();
  //   }catch(e){
  //       CASecurityClient = new security("Security");
  //   }
  CASecurityClient = new Security('Security')
  // CASecurityClient =  security("Security");
  // const vId = VCode; // 用户V码
  // const certlist:any = {}
  // certlist = CASecurityClient.SOF_GetUserList();
  const certlist = CASecurityClient.SOF_GetUserList()
  const certid = certlist
  if (certid === '' || certid === -3 || certid === null) {
    // alert("未检测到您的数字证书");
    return
  }
  // 2、 获取CertID对应证书和印章文件（建议在此步添加一个 V码验证。当前登录用户的V码与数字证书的V码是否一致）
  const clientcert = qdca_getclientcert(certid, CASecurityClient) // clientcert 签署者公钥证书
  if (clientcert === '' || clientcert === null || clientcert === 'null') {
    return
  }
  const sealdata = qdca_getSealData(certid, CASecurityClient) // sealdata 为 seal 印章加密信息 还要传单据号djh
  if (sealdata === '' || sealdata === null || sealdata === 'null') {
    return
  }
  // 获取证书名称
  const certcn = qdca_getcn(clientcert, CASecurityClient)
  if (certcn === '' || certcn === null || certcn === 'null') {
    return
  }
  // alert(certcn);
  // 获取企业V码
  let certvcode = qdca_getvcode(clientcert, CASecurityClient)
  if (certvcode === '' || certvcode === null || certvcode === 'null') {
    return
  }
  // alert(certvcode);
  if (certvcode === 'V1234567') {
    certvcode = 'V12970' // 海达源测试签章
  }
  const params = { seal: sealdata, clientcert, djh, certvcode }
  // console.log(params, 'params');
  return params
}
export function signature(msg, reportVersionId, reportId, fileName) { // msg为注册返回信息
  let CASecurityClient = {}
  // 1、选择证书
  // try{
  //     CASecurityClient.SOF_GetVersion();
  //   }catch(e){
  //       CASecurityClient = new security("Security");
  //   }
  CASecurityClient = new Security('Security')
  const certlist = CASecurityClient.SOF_GetUserList()
  const certid = certlist
  if (certid === '' || certid === -3 || certid === null) {
    // alert("未检测到您的数字证书");
    return
  }
  // 2、 获取CertID对应证书和印章文件（建议在此步添加一个 V码验证。当前登录用户的V码与数字证书的V码是否一致）
  const clientcert = qdca_getclientcert(certid, CASecurityClient) // clientcert 签署者公钥证书
  if (clientcert === '' || clientcert === null || clientcert === 'null') {
    return
  }
  const sealdata = qdca_getSealData(certid, CASecurityClient) // sealdata 为 seal 印章加密信息 还要传单据号djh
  if (sealdata === '' || sealdata === null || sealdata === 'null') {
    return
  }
  // 获取证书名称
  const certcn = qdca_getcn(clientcert, CASecurityClient)
  if (certcn === '' || certcn === null || certcn === 'null') {
    return
  }
  // alert(certcn);
  // 获取企业V码
  const certvcode = qdca_getvcode(clientcert, CASecurityClient)
  if (certvcode === '' || certvcode === null || certvcode === 'null') {
    return
  }
  // alert(certvcode);
  const signvalue = qdca_signByUK(certid, msg, CASecurityClient)
  // 签章
  signatureNew({ signvalue, reportVersionId, reportId, djh, staticResourceStoragePath: fileName }).then(result2 => {
  // console.log(result, '签章返回值')
    if (window.sessionStorage.getItem('signature') !== null) {
      sessionStorage.clear()
    }
    if (result2.success) {
      window.open(result2.resultData)
      window.sessionStorage.setItem('signature', true)
    } else {
      window.sessionStorage.setItem('signature', false)
    }
  }).catch(err => {
    console.log(err)
  })
}
