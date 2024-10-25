/**
 * Created by trungquandev.com's author on Dec 25, 2024
 */

export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};
