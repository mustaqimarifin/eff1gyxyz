/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-control-regex */
export const autosize = (target: HTMLTextAreaElement): void => {
  target.style.height = "initial";
  target.style.height = +target.scrollHeight + "px";
};

export const countLines = (el: HTMLElement): number => {
  if (!el) return -1;
  // Get total height of the content
  const divHeight = el.offsetHeight;

  // object.style.lineHeight, returns
  // the lineHeight property
  // height of one line
  const lineHeight = parseInt(
    window.getComputedStyle(el).getPropertyValue("line-height")
  );

  const lines = divHeight / lineHeight;
  return lines;
};

export const PAGE_SIZE = 10;
export const SCROLL_OFFSET_PX = 400;
export const MAX_DEPTH = 10;

export const validateEmail = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export const isEmail = (email: string) => {
  return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(
    email
  );
};
