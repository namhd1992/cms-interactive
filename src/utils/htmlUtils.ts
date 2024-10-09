export function createDom(el = 'div', tpl = '', attrs: any = {}, cname = '') {
    let dom = document.createElement(el)
    dom.className = cname
    dom.innerHTML = tpl
    Object.keys(attrs).forEach(item => {
      let key = item
      let value = attrs[item];
      if (el === 'video' || el === 'audio') {
        if (value) {
          dom.setAttribute(key, value)
        }
      } else {
        dom.setAttribute(key, value)
      }
    })
    return dom
  }
  
  export function hasClass(el: HTMLElement, className: string) {
    if (!el) {
      return false;
    }
  
    if (el.classList) {
      return Array.prototype.some.call(el.classList, item => item === className)
    } else if (el.className) {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    } else {
      return false;
    }
  }
  
  export function addClass(el: any, className: string) {
    if (!el) {
      return;
    }
  
    if (el.classList) {
      className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
        item && el.classList.add(item)
      })
    } else if (!hasClass(el, className)) {
      el.className += ' ' + className
    }
  }
  
  export function removeClass(el: HTMLElement, className: string) {
    if (!el) {
      return;
    }
  
    if (el.classList) {
      className.split(/\s+/g).forEach((item: string) => {
        el.classList.remove(item)
      })
    } else if (hasClass(el, className)) {
      className.split(/\s+/g).forEach((item: string) => {
        let reg = new RegExp('(\\s|^)' + item + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
      })
    }
  }
  
  export function toggleClass(el: HTMLElement, className: string) {
    if (!el) {
      return;
    }
  
    className.split(/\s+/g).forEach(item => {
      if (hasClass(el, item)) {
        removeClass(el, item)
      } else {
        addClass(el, item)
      }
    })
  }
  
  export function findDom(el = document, sel: string) {
    let dom;
  
    try {
      dom = el.querySelector(sel)
    } catch (e) {
      if (sel.indexOf('#') === 0) {
        dom = el.getElementById(sel.slice(1))
      }
    }
  
    return dom
  }
  