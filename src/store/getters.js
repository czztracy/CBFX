const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,

  // 权限
  roles: state => state.user.roles,
  rolesName: state => state.user.rolesName,
  company: state => state.user.company,
  avatarCode: state => state.user.avatarCode,
  loginName: state => state.user.loginname,
  addRouters: state => state.permission.addRouters,
  permission_routers: state => state.permission.routers,
  language: state => state.app.language,
  bool: state => state.permission.bool,
  // 控制报价单表区渲染
  gc: state => state.app.gc,
  // 编码
  userCode: state => state.user.usercode,
  userName: state => state.user.username,
  userSign: state => state.user.usersign,
  // 弹窗名称
  dialogTitle: state => state.permission.dialogTitle,
  // 字段库组件
  fieBool: state => state.field.fieldBool,
  // 条件选择
  triggleMonthYear: state => state.select.triggleMonthYear,
  areaChoose: state => state.select.areaChoose
}
export default getters
