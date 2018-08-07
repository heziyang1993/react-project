export function checkPhone (number) {
  if (/1\d{10}/.test(number)) {
    return {
      valid: true
    }
  } else {
    return {
      valid: false,
      msg: '请输入11位电话号码'
    }
  }
}