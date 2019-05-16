export const getUniqueId = (prefix="uid") => {
  return `${prefix}_${new Date().getTime()}`
}
