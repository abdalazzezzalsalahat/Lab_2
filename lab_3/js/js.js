'use strict';

let optValsOne = [];
let optValsTwo = [];
let uniqOptValOne = [];
let uniqOptValTwo = [];
let imgsArryOne = [];
let imgsArryTwo = [];
let pgNam = 'page-1';


function ImgsOne(title, image_url, description, horns, keyword){
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.horns = horns;
  this.keyword = keyword;
  imgsArryOne.push(this);
}
ImgsOne.prototype.renderOne = function() {
  let temp = $('#template').html();
  $('#box-one').append(Mustache.render(temp, this));
};
ImgsOne.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('../../data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(elmnt => {
        optValsOne.push(elmnt.keyword);
        let img = new ImgsOne(elmnt.title, elmnt.image_url, elmnt.description, elmnt.horns, elmnt.keyword);
        img.renderOne();
      });
      $.each(optValsOne, function(el){
        if($.inArray(el, uniqOptValOne) === -1) uniqOptValOne.push(el);
      });
      uniqOptValOne.forEach(function(value){
        $('#drop-dwn').append(`<option value="${value}">${value}</option>`);
      });
    });
};
function kywrdsOne(){
  $('#drop-dwn').on('change',function(){
    let name = this.options[this.selectedIndex].text;
    if(name ==='default'){
      let tmpltOne = $('.photo-template').clone();
      $('#box-one').html('');
      $('#box-one').append(tmpltOne);
      imgsArryOne.forEach(function(val){
        val.renderImages();
      });
    }else{
      let tmpltOne = $('.photo-template').clone();
      $('#box-one').html('');
      $('#box-one').append(tmpltOne);
      imgsArryOne.forEach(function(val){
        if(name === val.keyword){
          val.renderImages();
        }
      });
    }
  });
}

function ImgsTwo(title, image_url, description, horns, keyword){
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.horns = horns;
  this.keyword = keyword;
  imgsArryTwo.push(this);
}
ImgsTwo.prototype.renderTwo = function() {
  let temp = $('#template').html();
  $('#box-two').append(Mustache.render(temp, this));
};
ImgsTwo.readJson2 = () => {
  const ajaxSettings ={
    method: 'get',
    dataType: 'json'
  };
  $.ajax('../../data/page-2.json', ajaxSettings)
    .then(data => {
      data.forEach(elmnt => {
        optValsTwo.push(elmnt.keyword);
        let img = new ImgsTwo(elmnt.title, elmnt.image_url,elmnt.description, elmnt.horns,elmnt.keyword );
        img.renderTwo();
      });
      $.each(optValsTwo, function(el){
        if($.inArray(el, uniqOptValTwo) === -1) uniqOptValTwo.push(el);
      });
      uniqOptValTwo.forEach(function(value){
        $('#drop-dwn').append(`<option value="${value}">${value}</option>`);
      });
    });
};
function kywrdsTwo(){
  $('#drop-dwn').on('change',function(){
    let name = this.options[this.selectedIndex].text;
    if(name ==='default'){
      let tmpltTwo = $('#template').clone();
      $('#box-two').html('');
      $('#box-two').append(tmpltTwo);
      imgsArryTwo.forEach(function(val){
        val.renderImagesTwo();
      });
    }else{
      let tmpltTwo = $('#template').clone();
      $('#box-two').html('');
      $('#box-two').append(tmpltTwo);
      imgsArryTwo.forEach(function(val){
        if(name === val.keyword){
          val.renderImagesTwo();
        }
      });
    }
  });
}

$(document).ready(function () {
  ImgsOne.readJson();
  kywrdsOne();
});

$('#page-1').on('click', function () {
  $('#drop-dwn').html('');
  $('#box-two').hide();
  $('#box-one').show();
  $('#box-one').empty();
  ImgsOne.readJson();
  kywrdsOne();
  pgNam = 'page-1';
  imgsArryOne = [];
});
$('#page-2').on('click', function () {
  $('#drop-dwn').html('');
  $('#box-one').hide();
  $('#box-two').show();
  $('#box-two').empty();
  ImgsTwo.readJson2();
  kywrdsTwo();
  pgNam = 'page-2';
  imgsArryTwo = [];
});

function sortByTitle() {
  if (pgNam === 'page-1') {
    imgsArryOne.sort(function (frst, sec) {
      if (frst.title > sec.title) return 1;
      if (sec.title > frst.title) return -1;
      return 0;
    });
    $('#box-one').html('');
    imgsArryOne.forEach(function (val) {
      val.renderOne();
    });
  }
  if (pgNam === 'page-2') {
    imgsArryTwo.sort(function (frst, sec) {
      if (frst.title > sec.title) return 1;
      if (sec.title > frst.title) return -1;
      return 0;
    });
    $('#box-two').html('');
    imgsArryTwo.forEach(function (val) {
      val.renderTwo();
    });
  }
}
function sortByHorns() {
  if (pgNam === 'page-1') {
    imgsArryOne.sort(function (frst, sec) {
      if (frst.horns > sec.horns) return 1;
      if (sec.horns > frst.horns) return -1;
      return 0;
    });
    $('#box-one').html('');
    imgsArryOne.forEach(function (val) {
      val.renderOne();
    });
  }
  if (pgNam === 'page-2') {
    imgsArryTwo.sort(function (frst, sec) {
      if (frst.horns > sec.horns) return 1;
      if (sec.horns > frst.horns) return -1;
      return 0;
    });
    $('#box-two').html('');
    imgsArryTwo.forEach(function (val) {
      val.renderTwo();
    });
  }
}

$('#title').on('click', function () {
  sortByTitle();
});
$('#horns').on('click', function () {
  sortByHorns();
});
