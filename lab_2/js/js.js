function Img(pic) {
  this.img_src = pic.img_src;
  this.title = pic.title;
  this.dsc = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;
}
let kywrds = [];
Img.prototype.render = function() {
  $('#box').append(
    `<div class="${this.keyword} gallery">
        <h4>${this.title}</h4>
        <img src="${this.img_src}">
        <p class= "desc">${this.dsc}</p>
    </div>`);
  if (kywrds.includes(this.keyword) !== true) {
    kywrds.push(this.keyword);
    $('#drop-dwn').append(`<option value="${this.keyword}">${this.keyword}</option>`);
  }
};

$(document).ready(function() {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('./data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(item => {
        let picture = new Img(item);
        picture.render();
      });
    });
  $('#drop-dwn').on('change', function() {
    let chosenOption = '.' + this.value;
    $('.gallery').hide();
    $(chosenOption).show();
  });
});
