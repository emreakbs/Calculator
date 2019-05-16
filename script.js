//
//temizleme işlemi
//
function sil() {
  document.getElementById("screen").value = "";
  sayilar = [];
  operatorGirisKontrol = 0;
  ekranKontrol = "";
  yazSayac = 0
}
//
//oluşturma işlemi
//
function create() {
  var buttonValues = "789/456*123-0.=+C";
  var skipLine = document.createElement("br");

  //ekrana textbox oluşturmaya yarar.
  var screen = document.createElement("input");
  screen.type = "text";
  screen.id = "screen";
  document.body.appendChild(screen);
  document.body.appendChild(skipLine);
  var spaceControl = 0;
  //ekrana butonları eklemeye yarar.
  for (var i = 0; i < buttonValues.length; i++) {
    var buton = document.createElement("input");
    buton.setAttribute("type", "button");
    buton.setAttribute("value", buttonValues[i]);
    if (buttonValues[i] == "C") {
      buton.setAttribute("class", "butonClear");
      buton.setAttribute("onclick", "sil()");
      buton.setAttribute("id", "delete");
    } else {
      buton.setAttribute("onclick", "hesapla(this.value)");
      buton.setAttribute("class", "buton");
    }
    document.body.appendChild(buton);

    spaceControl++;
    //4 buton eklendiğinde bir boşluk ekelemesini kontrol eder.
    if (spaceControl % 4 == 0) {
      var skipLine = document.createElement("br");
      document.body.appendChild(skipLine);
    }
  }
}

//
//hesaplama işlemi
//
var sayilar = []; //split edilince sayıların atılması için tanımlandı.
var operatorGirisKontrol = 0; //operatörün 1 kere girilmesini kontrol etmek için tanumlandı.
var ekranKontrol = ""; //butondan gelen değerlerin elde tutulup işlem yapılabilmesi için tanımlandı.
var yazSayac = 0; //sonucun bir kere çalışmasını kontrol için tanımlandı
function hesapla(butonDeger) {
  var numbers = "0123456789.";
  var operators = "/*-+";
  //numara tuşlarından birisine tıklanırsa çalışır.
  if (numbers.indexOf(butonDeger) >= 0) {
    document.getElementById("screen").value += butonDeger;
    ekranKontrol += butonDeger;
  }
  //operatör tuşlarından birisine tılanırsa çalışır.
  else if (operators.indexOf(butonDeger) >= 0) {
    if (operatorGirisKontrol < 1) { //kullanıcının bir kere operatör girebilmesi için koyulan şart
      document.getElementById("screen").value += butonDeger;
      ekranKontrol += butonDeger;
      console.log(ekranKontrol)
      operatorGirisKontrol++;
    }
    //kullanıcının ikinci kere operatör girmeye çalışmasını kontrol eder.
    else {
      if (ekranKontrol.indexOf('+') >= 0) { //ekran kontrol içerisinde +  operatörü varsa
        var yeniEkran = ekranKontrol.replace("+", butonDeger); //ekran içerisindeki aranan değeri yeni değerle değiştirerek yeni değer içerisne aktarılır.
        document.getElementById("screen").value = yeniEkran; //yeni değer ekrana yazılır.
        ekranKontrol = yeniEkran; //işlemde karışıklık olmaması için yeni değer eski ekran değeri içerisine atılır.
      } else if (ekranKontrol.indexOf('-') >= 0) {
        var yeniEkran = ekranKontrol.replace("-", butonDeger);
        document.getElementById("screen").value = yeniEkran;
        ekranKontrol = yeniEkran;

      } else if (ekranKontrol.indexOf('*') >= 0) {
        var yeniEkran = ekranKontrol.replace("*", butonDeger);
        document.getElementById("screen").value = yeniEkran;
        ekranKontrol = yeniEkran;

      } else if (ekranKontrol.indexOf('/') >= 0) {
        var yeniEkran = ekranKontrol.replace("/", butonDeger);
        document.getElementById("screen").value = yeniEkran;
        ekranKontrol = yeniEkran;

      }
    }
  }
  //numara yada operator harici birşeye tklanırsa çalışır.
  else {
    if (ekranKontrol.indexOf("+") >= 0) { //ekran kontrol içerisinde +  operatörü varsa
      sayilar = ekranKontrol.split('+'); //sayıarı operatöre göre parçalar sayılar dizisine atar.
      document.getElementById("screen").value = parseFloat(sayilar[0]) + parseFloat(sayilar[1]); //ekrana iki sayının işlem görmüş halini bastırır.
    } else if (ekranKontrol.indexOf("-") >= 0) {
      sayilar = ekranKontrol.split('-');
      document.getElementById("screen").value = parseFloat(sayilar[0]) - parseFloat(sayilar[1]);
    } else if (ekranKontrol.indexOf('*') >= 0) {
      sayilar = ekranKontrol.split('*');
      document.getElementById("screen").value = parseFloat(sayilar[0]) * parseFloat(sayilar[1]);
    } else if (ekranKontrol.indexOf('/') >= 0) {
      sayilar = ekranKontrol.split('/');
      document.getElementById("screen").value = parseFloat(sayilar[0]) / parseFloat(sayilar[1]);
    } else
    if (yazSayac < 1) {
      yazSayac++;
    }

  }
}