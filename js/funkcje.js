$(function () {
    //Poda zaladowaniu strony wyswietl wszystkich uczestnikow
    Wyswietl();
    //Dodaj zdarzenie buttonowi btnDodaj
    $('#btnDodaj').on('click', Dodaj);
    //Dodaje zdarzenie rysowania tabeli
    $('#btnRysuj').on('click', RysujTabele);
    $('#ss1').on('click', ALA);
});

function ALA() {
    KolejnaPot2($('#ss').val());
}

/**
 * Wyswietla listę uczestników
 */
function Wyswietl()
{
    //Usuń wszystkie li
    $('#wyswUczestnicy').children().remove();
    
    var tblUczest = localStorage.getItem('Uczestnicy');
    tblUczest = JSON.parse(tblUczest);
    for(var i in tblUczest)
    {
        $('#wyswUczestnicy').append(
            '<li>' +
            '<label>' + tblUczest[i] + '</label>' +
            '<div style="float: right">'+
            '<button type="button" class="btn btn-default btn-xs btnEdytuj"><span class="glyphicon glyphicon-pencil"></span></button>'+
            '<button type="button" class="btn btn-default btn-xs btnUsun"><span class="glyphicon glyphicon-trash"></span></button>'+
            '</div>'+
            '</li>');        
    }
    $('#wyswUczestnicy').find('.btnEdytuj').on('click', Edytuj);
    $('#wyswUczestnicy').find('.btnUsun').on('click', Usun);
}

/**
 * Dodaje nowego uczestnika do listy
 */
function Dodaj() {
    var tblUczest = localStorage.getItem('Uczestnicy');
    tblUczest = JSON.parse(tblUczest);
    if(tblUczest == null)
        tblUczest = [];
    
    var inptUczest = $('#gracz').val();
    //TODO: Wiadomosc przy dodawaniau ze taki gracz juz istnieje
    //Jezeli pole nie jest puste i nie ma takiego w tablicy 
    if((inptUczest) && (jQuery.inArray(inptUczest, tblUczest) === -1))
    {
        //Dodaj do tablicy
        tblUczest.push(inptUczest);
    }
    localStorage.setItem('Uczestnicy', JSON.stringify(tblUczest));
    
    //Wyczysc wartosc w inpucie po dodaniu elementu
    $('#gracz').val('');
    Wyswietl();
}

/**
 * Dodanie formularz edycji po nacisnieciu buttona
 */
//TODO: Pozawalaj na tylko jedną edycje
function Edytuj() {
    var wysw = $(this).data('wyswietlone');
    var parLi = $(this).closest('li');
    var oldUczest = parLi.find('label').text();

    if(wysw) {
        //Drugie klikniecie
        parLi.find('.editMore').remove();
    } else {
        //Pierwsze klikniecie
        parLi.append(
            '<div class="row editMore">'+
                '<div class="col-xs-12">'+
                    '<hr>'+
                    '<div class="input-group">'+
                        '<input type="text" class="form-control" value="'+oldUczest+'">'+
                        '<span class="input-group-btn">'+
                            '<button type="button" class="btn btn-default btnChange">Zmień</button>'+
                        '</span>'+
                    '</div><!-- /input-group -->'+
                '</div><!-- /.col-lg-6 -->'+
            '</div><!-- /.row -->'
        );
    }
    $(this).data('wyswietlone', !wysw);

    $(this).closest('li').find('.btnChange').on('click', Zmien);
}

/**
 * Zatwierdza zmiane dokonana w formularzu zmiany
 */
function Zmien() {
    var parLi = $(this).closest('li');
    var oldUczest = parLi.find('label').text();
    var newUczest = parLi.find('input').val();
        
    //Jezeli pole nie jest puste i nie ma takiego
    if((newUczest) && (jQuery.inArray(newUczest, tblUczest) !== -1)) {
        //Odczytaj z localStorage
        var tblUczest = localStorage.getItem('Uczestnicy');
        //Zmien String na tablice
        tblUczest = JSON.parse(tblUczest);
        //Znajduje pozycje w tablicy
        var id = tblUczest.indexOf(oldUczest);
        if(id !== -1)
            //Zamienia 
            tblUczest[id] = newUczest;
        localStorage.setItem('Uczestnicy', JSON.stringify(tblUczest));
    }
    
    Wyswietl();
}

/**
 * Usuwa uczestników z listy
 */
function Usun() {
    //Pobierz wartosc z label
    var uczestnik = $(this).parent().siblings('label').text();
    //Odczytaj z localStorage
    var tblUczest = localStorage.getItem('Uczestnicy');
    //Zmien String na tablice
    tblUczest = JSON.parse(tblUczest);
    //Usun z tablicy tblUczest wartosc uczestnik
    tblUczest.splice($.inArray(uczestnik, tblUczest),1);
    //Zapisz do localStorage string tblUczest
    localStorage.setItem('Uczestnicy', JSON.stringify(tblUczest));

    Wyswietl();
}

function RysujTabele() {
    var tabela = $('#dDrabinka');
    
    var wysPole = 20;
    var wysPierwOdst = 10;
    var wysOdst = 20;
    var szerNazwa = 95;
    var szerWyn = 20;
    var szerKresk = 20;
    var margNazwa = 5;
    
    var gracze = localStorage.getItem('Uczestnicy');
    gracze = JSON.parse(gracze);
    var iloscGraczy = gracze.length;
    var iloscRund = KtoraPotega2(iloscGraczy);
    var str = "";
    
    for(var j = 0; j < iloscRund; j++) {
        str += '<div id="r'+j+'" class="runda">' +
               '<div class="naglowek">Runda 1</div>' +
               '<div class="pierwOdst"></div>';
        for (var i = 0; i < (KolejnaPot2(iloscGraczy) / DzielnikKolejneRundy(j)); i++) {
            str += '<div class="gracz gracz'+i+'">' +
                        '<div class="nazwa">' +
                            gracze[i] +
                        '</div>' +
                        '<div class="wynik">' +
                            0 +
                        '</div>' +
                        '<div class="kreski">' +
                            '&nbsp;'+
                        '</div>' +
                    '</div>';

            //Co dwoch graczy (jeden mecz)
            //i+1 bo zaczyna sie od 0
            if(!((i + 1) % 2)) {
                //Nie rob odstepu po ostatnim meczu
                if(i < ((KolejnaPot2(iloscGraczy) / DzielnikKolejneRundy(j)) - 1)) {
                    //Zrob odstep
                    str += '<div class="odstep odstep'+((i-1)/2)+'"></div>';
                }
            }
        }
        str += '<div class="pierwOdst"></div>';
        str += '</div>';//end runda
    }
    
    tabela.append(str);
    
    for(var i = 0; i < KolejnaPot2(iloscGraczy); i++) {
        //co drugi
        if(!((i + 1) % 2)) {
            //ale nie co czwarty
            if(((i + 1) % 4)) {
                    tabela.find('.gracz'+ i).find('.kreski').css({'border-top': '1px solid black', 'border-right': '1px solid black'});
                    tabela.find('.gracz'+ i).find('.kreski').css({'border-top': '1px solid black', 'border-right': '1px solid black'});
                }
        }
        //co czwarty
        if(!((i + 1) % 4)) {
            //Co 4 elementy - 1 (nie to samo co, co 3 elementy) 3, 7, 11 rysuj ramke
            tabela.find('.gracz'+ (i-1)).find('.kreski').css({'border-right': '1px solid black'});
            //Co 4 elementy rysuj ramke
            tabela.find('.gracz'+ i).find('.kreski').css({'border-top': '1px solid black'});
        }
    }
    
    //Ustawienie szerokosci tabeli na ilosc rund * szerokosc 
    //wszystkich elementow
    //tabela.css('width', 2 * (margNazwa + szerNazwa + szerWyn + szerKresk));
    
    tabela.css({'overflow': 'hidden'});
    tabela.find('.runda').css({'width': margNazwa + szerNazwa + szerWyn + szerKresk, 'float': 'left'});
    
    tabela.find('.gracz').css({'overflow': 'hidden'});
    
    tabela.find('.nazwa').css({'background-color': 'green', 'width': szerNazwa, 'margin-left': margNazwa, 'float': 'left'});
    tabela.find('.wynik').css({'width': szerWyn, 'text-align': 'right', 'float': 'left'});
    tabela.find('.kreski').css({'width': szerKresk, 'float': 'left'});
    tabela.find('.pierwOdst').css({'height': wysPierwOdst});
    tabela.find('.odstep').css({'height': wysOdst});
    $('.runda .odstep:nth-child(odd)').css({'border-right': '1px solid black'});
    var poprzWys = 10;
    for(var i = 1; i < iloscRund; i++) {
        tabela.find('#r'+i).find('.pierwOdst').css({'height': (wysPole + (2 * poprzWys))});
        poprzWys = parseInt(tabela.find('#r'+ i ).find('.pierwOdst').css('height'), 10);
        tabela.find('#r'+i).find('.odstep').css({'height': (poprzWys * 2)});
    }
    tabela.find('#r'+(iloscRund-1)).find('.kreski').css({'border': 0});
}

var KolejnaPot2 = function (liczba) {
    var pom = 1;

    //Zwraca zawsze kolejna potege 2 nawet jesli liczba
    //jest potega 2
    do {
        pom *= 2;
    } while(pom < liczba);
    return pom;
}

var KtoraPotega2 = function (liczba) {
    var pom = 1, i = 0;
    do {
        i++;
        pom *= 2;
    } while(pom < liczba);
    return i;
}

var DzielnikKolejneRundy = function (runda){
    var pom = 1;
    for(var i = 0; i < runda; i++)
    {
        pom *= 2;
    }
    return pom;
}
