export const changeToSlug = (title, options = {}) => {
    const { spaceReplace, notSpace, upperCase }: any = options;
  
    if (!title) {
      return 'media';
    }
  
    let slug = title.toLowerCase();
  
    const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịỳýỷỹỵäëïîöüûñç';
    const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiyyyyyaeiiouunc';
  
    for (let i = 0, l = from.length; i < l; i++) {
      slug = slug.replace(RegExp(from[i], 'gi'), to[i])
    }
  
    slug = slug.replace(/[^ a-z0-9]/g, '');
  
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
  
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  
    //Đổi khoảng trắng thành ký tự gạch ngang
    if (notSpace) {
      slug = slug.replace(/ /gi, '');
      slug = slug.replace(/-/gi, '');
    } else {
      slug = slug.replace(/ /gi, spaceReplace || '-');
    }
  
    if (upperCase) {
      slug = slug.toUpperCase();
    }
  
    return slug;
  };