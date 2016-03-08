'use strict';

describe('test', function () {
  it('test', function (done) {
    fetch.files.embr = './fixtures/embr.xml';
    fetch.files.mont = './fixtures/mont.xml';
    fetch.files.powl = './fixtures/powl.xml';
    fetch.files.civc = './fixtures/civc.xml';
    var bobo = new Bobo();
    bobo.fetch().then(function () {
      expect(3).to.eq(3);
      //console.log(bobo.stations[0].getElementsByTagName("abbr")[0].textContent);
      done();
    });
    //setTimeout(function () {
      //done();
    //}, 500);
  });
});
/*

var mocha = require('mocha');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

//describe('test', function () {
  //it('test', function () {
    //var a = 1;
    //expect(a).to.eq(1);


//after(function () {
  //jQuery.ajax.restore();
//});

//it("makes a GET request for todo items", function () {
    //sinon.stub(jQuery, "ajax");
    //getTodos(42, sinon.spy());

    //assert(jQuery.ajax.calledWithMatch({ url: "/todo/42/items" }));
//});
  //});
//});

var xhr, requests;

before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
});

after(function () {
    // Like before we must clean up when tampering with globals.
    xhr.restore();
});

it("makes a GET request for todo items", function () {
  var app = require('../../src/app');

  assert.equals(requests.length, 1);
  assert.match(requests[0].url, "/todo/42/items");
  });
  */
