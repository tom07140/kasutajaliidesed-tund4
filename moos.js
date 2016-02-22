(function(){
  "use script";

  var Moosipurk = function(){

    //see on singleton pattern
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }

    //this viitab moosipurgi funktsioonile
    Moosipurk.instance = this;

    this.routes = Moosipurk.routes;

    console.log("Moosipurgi sees");

    //kõik muutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
    this.click_count = 0;
    this.currentRoute = null;
    console.log(this);

    //kui tahan moosipurgile referenci siis kasuton THIS = MOOSIPURGI RAKENDUS ISE
    this.init();

  };

  window.Moosipurk = Moosipurk; //paneme muutuja külge

  Moosipurk.routes = {
     'home-view': {
       'render': function(){
         // käivitame siis kui lehte laeme
         console.log('>>>>avaleht');
       }
     },
     'list-view': {
       'render': function(){
         // käivitame siis kui lehte laeme
         console.log('>>>>loend');

         //simulatsioon laeb kaua
         window.setTimeout(function(){
           document.querySelector('.loading').innerHTML = 'Laetud!';
         }, 3000);
       }
     },
     'manage-view': {
       'render': function(){
         // käivitame siis kui lehte laeme
       }
     }
   };

  //kõik funktsioonid lähevad moosipurgi külge
  Moosipurk.prototype = {
    init: function(){
      console.log("Rakendus läks tööle");

      //kuulan aadressirea vahetust
      window.addEventListener('hashchange', this.routeChange.bind(this));

      //kui aadressireal ei ole hashi siis lisan juurde
      if(!window.location.hash){
        window.location.hash = 'home-view';
        //routechange siin ei ole vaja sest käsitsi muutmine käivitab routechange event'i ikka
      }else{
        //esimesel käivitamisel vaatame urli üle ja uuendame menüüd
        this.routeChange();
      }

      //kuulame hiireklikki nupul
      this.bindMouseEvents();

    },
    bindMouseEvents: function(){
      document.querySelector('.add-new-jar').addEventListener('click',this.addNewClick.bind(this));
    },
    addNewClick: function(event){
      //console.log(event);
      var title = document.querySelector('.title').value;
      var ingredients = document.querySelector('.ingredients').value;
      //console.log(title + ' ' + ingredients);
      //1) tekitan uue Jar'i
       var new_jar = new Jar(title, ingredients);
       // 2) lisan selle htmli listi juurde
       var li = new_jar.createHtmlElement();
       document.querySelector('.list-of-jars').appendChild(li);

    },
    routeChange: function(event){
      //kirjutan muutujasse lehe nime, võtan maha #
      this.currentRoute = location.hash.slice(1);
      console.log(location.currentRoute);

      //kas meil on selline leht olemas?
      if(this.routes[this.currentRoute]){
        //muudan menüü lingi aktiivseks
        this.updateMenu();
        this.routes[this.currentRoute].render();
      }else{
        ///404 - ei olnud

      }

    },
    updateMenu: function(){
      //1) võtan maha aktiivse menüü lingi kui on
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');

      //2) lisan uuele juurde
      //console.log(location.hash);
      document.querySelector('.'+this.currentRoute).className += ' active-menu';
    }
  }; //MOOSIPURGI LÕPP

  var Jar = function(new_title, new_ingredients){
    this.title = new_title;
    this.ingredients = new_ingredients;
    console.log('created new jar');
  };

  Jar.prototype = {
    createHtmlElement: function(){
      //võttes title ja ingredients ->
      /*
      li
        span.letter
          M <- title esimene täht
        span.content
          title | ingredients
      */

      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'letter';

      var letter = document.createTextNode(this.title.charAt(0));
      span.appendChild(letter);

      li.appendChild(span);

      var span_with_content = document.createElement('span');
      span_with_content.className = 'content';

      var content = document.createTextNode(this.title + ' | ' + this.ingredients);
      span_with_content.appendChild(content);

      li.appendChild(span_with_content);

      return li;
    }
  };

  window.onload=function(){
    var app = new Moosipurk();
  };



})();
