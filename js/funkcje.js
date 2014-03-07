$(function () {
    //Po zaladowaniu strony wyswietl wszystkich uczestnikow
    Wyswietl(1);
    //Dodaj zdarzenie buttonowi btnDodaj
    $('#btnDodaj').on('click', Dodaj);
    //Ukrycie przy ladowaniu strony bledow przy wprowadzaniu danych
    $('.help-block').hide();
    $('#paginator').bootstrapPaginator({
        totalPages: LiczbaStron(),
        onPageClicked: function(e, originalEvent, type, page) {
            Wyswietl(page);
        }
    });
    //Dodawanie gracza po nacisnieci entera
    $('#gracz').keypress(function(e){
        if(e.which == 13) {
            Dodaj();
        }
    });
});
/**
 * Wyswietla listę uczestników
 */
function Wyswietl(ktoraStrona)
{
    //Usuń wszystkie li
    $('#wyswUczestnicy').children().remove();
    
    var tblUczest = localStorage.getItem('Uczestnicy');
    tblUczest = JSON.parse(tblUczest);
    
    //Paginator numeruje od 1
    ktoraStrona--;
    for(var i = (ktoraStrona * 10); i < (ktoraStrona * 10) + 10; i++)
    {
        //Jezeli na ostatniej stronie jest nie rowna liczba 
        //elementow nie wyswiatlaj undefinad
        if(typeof(tblUczest[i]) != "undefined") {
            $('#wyswUczestnicy').append(
                '<li value="'+(i+1)+'">' +
                '<label>' + tblUczest[i] + '</label>' +
                '<div style="float: right">'+
                '<button type="button" class="btn btn-default btn-xs btnEdytuj"><span class="glyphicon glyphicon-pencil"></span></button>'+
                '<button type="button" class="btn btn-default btn-xs btnUsun"><span class="glyphicon glyphicon-trash"></span></button>'+
                '</div>'+
                '</li>');
        }        
    }
    $('#wyswUczestnicy').find('.btnEdytuj').on('click', Edytuj);
    $('#wyswUczestnicy').find('.btnUsun').on('click', Usun);
    $('#paginator').find('ul').addClass("pagination");
    if(LiczbaGraczy() > 2)
        //Dodaje zdarzenie rysowania tabeli
        $('#btnRysuj').on('click', RysujTabele);
    else
        //Wyswietl komunikat ze musi być wiecej niz 2 graczy
        $('#btnRysuj').off('click');
}

$('#mWynik').on('hidden.bs.modal', function () {
    $(this).removeData('bs.modal');
});

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
    Wyswietl($('#paginator').bootstrapPaginator("getPages")["current"]);
    //Odswiez ilosc stron
    $('#paginator').bootstrapPaginator({totalPages: LiczbaStron()});
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
    
    Wyswietl($('#paginator').bootstrapPaginator("getPages")["current"]);
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

    Wyswietl($('#paginator').bootstrapPaginator("getPages")["current"]);
    //Odswiez ilosc stron
    $('#paginator').bootstrapPaginator({totalPages: LiczbaStron()});
}

//Rysuje Drabinke
function RysujTabele() {
    var tabela = $('#dDrabinka');
    //Przed rysowaniem wyczysc div, bo mogl byc wczesniej nacisniety
    tabela.text("");
    
    var wysPole = 33;
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
    var wielkoscDrabinki = KolejnaPot2(iloscGraczy);
    var str = "";
    
    //Ile pustych miejsc w pierwszej rundzie
    var iloscBrakujacych = wielkoscDrabinki - iloscGraczy;
    var tabFreeWin = [];
    for(var i = 0; i < iloscBrakujacych; i++) {
        //losuje mecz w ktorym gracz ma wygrac automatycznie (ilosc graczy /2)
        do {
            var freeWin = Math.floor((Math.random()*(wielkoscDrabinki / 2))+1);
        } while (tabFreeWin.indexOf(freeWin)!==-1);
        tabFreeWin[i] = freeWin;
    }
    //Pomieszanie graczy miejscami
    gracze = pomieszajTablice(gracze);
    //Sortowanie liczb rosnaco
    tabFreeWin.sort(function(a,b){return a-b;});
    for(var i = 0; i < iloscBrakujacych; i++) {
        //Automatyczna wygrana jest zawsze drugim zawodnikiem
        tabFreeWin[i] = (tabFreeWin[i] * 2) - 1;
        //Dodaj do tablicy przesuwajac kolejne elementy
        gracze.splice(tabFreeWin[i], 0, 'Free Win');
    }
    
    for(var j = 0; j < iloscRund; j++) {
        str += '<div id="r'+j+'" class="runda">' +
               '<pre>Runda '+(j + 1)+'</pre>' +
               '<div class="pierwOdst"></div>';
        for (var i = 0; i < (wielkoscDrabinki / DzielnikKolejneRundy(j)); i++) {
            str += '<div class="gracz gracz'+i+'" data-target="#mWynik" data-toggle="modal" data-id="'+i+'">' +
                        '<div class="nazwa">';
            //Wyswietlaj nazwy graczy tylko w 1 rundzie??
            if(j == 0)
                str += gracze[i];
            //else
                //str += '&nbsp;'
            str += '</div>' +
                    '<div class="wynik wynik'+i+'">' +
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
                if(i < ((wielkoscDrabinki / DzielnikKolejneRundy(j)) - 1)) {
                    //Zrob odstep
                    str += '<div class="odstep odstep'+((i-1)/2)+'"></div>';
                }
            }
        }
        str += '<div class="pierwOdst"></div>';
        str += '</div>';//end runda
    }
    
    tabela.append(str);
    
    //Dodanie kresek (nie mozna we wczesniejszej petli bo nie wykrywa jeszcze tych elementow)
    for(var i = 0; i < wielkoscDrabinki; i++) {
        //co drugi
        if(!((i + 1) % 2)) {
            //ale nie co czwarty
            if(((i + 1) % 4)) {
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
    tabela.css('width', iloscRund * (margNazwa + szerNazwa + szerWyn + szerKresk));
    
    //Overflow poniewaz rundy maja float
    tabela.css({'overflow': 'hidden'});
    tabela.find('.runda').css({'width': margNazwa + szerNazwa + szerWyn + szerKresk, 'float': 'left'});
    
    tabela.find('.gracz').css({'overflow': 'hidden'});
    
    tabela.find('.nazwa').css({'width': szerNazwa, 'height': wysPole, 'margin-left': margNazwa, 'float': 'left'});
    tabela.find('.wynik').css({'width': szerWyn, 'height': wysPole, 'text-align': 'right', 'float': 'left'});
    tabela.find('.kreski').css({'width': szerKresk, 'height': wysPole, 'float': 'left'});
    tabela.find('.pierwOdst').css({'height': wysPierwOdst});
    tabela.find('.odstep').css({'height': wysOdst});
    $('.runda .odstep:nth-child(odd)').css({'border-right': '1px solid black'});
    //w 1 rundzie 
    var poprzWys = wysPierwOdst;
    //Ustawienie pierwszych odstepow i odstepow w kolejnych runach
    for(var i = 1; i < iloscRund; i++) {
        //Ustawienie pierwszego odstepu w kolejych rundach
        tabela.find('#r'+i).find('.pierwOdst').css({'height': (wysPole + (2 * poprzWys))});
        //parse poniewaz zwracanyc byl string z *px
        poprzWys = parseInt(tabela.find('#r'+ i ).find('.pierwOdst').css('height'), 10);
        //odstep jest 2x pierwszy odstep
        tabela.find('#r'+i).find('.odstep').css({'height': (poprzWys * 2)});
    }
    //w ostaniej rundzie nie wyswietlaj kresek
    tabela.find('#r'+(iloscRund-1)).find('.kreski').css({'border': 0});
    
    //Po nacisnieciu na gracza
    $('.gracz').on('click', function(e) {
        var rundaId = $(this).parent().attr('id'); 

        //Przypisz do zmiennej id gracza na ktorego nacisnieto
        var gracz1Id = $(this).data('id');
        
        //Jezeli wybrano drugiego gracza z meczu to 
        //wez wczesniejszego jak nie to nastepnego
        if(gracz1Id % 2 == 0) {
            var gracz2Id = gracz1Id + 1;
        } else {
            var gracz2Id = gracz1Id;
            gracz1Id--
        }
        //
        $('#myModalLabel').text("Wynik meczu");
        $('#lGracz1').text(gracze[gracz1Id]);
        $('#lGracz1').data('graczek1ID', gracz1Id);
        $('#lGracz1').data('runda', rundaId);
        $('#lGracz2').text(gracze[gracz2Id]);
        $('#lGracz2').data('graczek2ID', gracz2Id);
        //Po zatwierdzeniu wyniku
    });
    $('#modalAccept').on('click', function() {
        var gracz1Id = $('#lGracz1').data('graczek1ID');
        var gracz2Id = $('#lGracz2').data('graczek2ID');
        var rundaId = $('#lGracz1').data('runda');
        //Jezeli obie zmienne to liczby
        if(($('#iGracz1').val() == parseInt($('#iGracz1').val())) &&
                ($('#iGracz2').val() == parseInt($('#iGracz2').val()))) {
            //Jezeli obie zmienne nie sa 0
            if(!(($('#iGracz1').val() == 0) && ($('#iGracz1').val() == 0))) {
                $('#'+rundaId).find('.wynik'+gracz1Id).text($('#iGracz1').val());
                $('#'+rundaId).find('.wynik'+gracz2Id).text($('#iGracz2').val());
                //Jezeli wygral gracz 1
                if($('#iGracz1').val() > $('#iGracz2').val())
                    //Jezeli to nie jest ostatnia runda
                    if(rundaId.substring(1) < iloscRund - 1)
                        $('#r'+(parseInt(rundaId.substring(1)) + 1)).find('.gracz'+(Math.floor(gracz1Id/2))).find('.nazwa').text($('#'+rundaId).find('.gracz'+gracz1Id).find('.nazwa').text());
                //Jezeli wygral gracz 2    
                if($('#iGracz2').val() > $('#iGracz1').val())
                    //Jezeli to nie jest ostatnia runda
                    if(rundaId.substring(1) < iloscRund - 1)
                        $('#r'+(parseInt(rundaId.substring(1)) + 1)).find('.gracz'+(Math.floor(gracz2Id/2))).find('.nazwa').text($('#'+rundaId).find('.gracz'+gracz2Id).find('.nazwa').text());
            }
        }
        $('#iGracz1').val('');
        $('#iGracz2').val('');
    });
    for(var i = 0; i < wielkoscDrabinki; i++)
    {
        if($('#r0').find('.gracz' + i).find('.nazwa').text() == 'Free Win') {
            if(i % 2 == 0) {
                $('#r1').find('.gracz' + Math.floor(i/2)).find('.nazwa').text($('#r0').find('.gracz' + (i+1)).find('.nazwa').text());
            } else {
                $('#r1').find('.gracz' + Math.floor(i/2)).find('.nazwa').text($('#r0').find('.gracz' + (i-1)).find('.nazwa').text());
            }
        }
    }
 }
 
 $('#mWynik').on('hidden.bs.modal', function(e) {
    $(this).removeData('modal');
});

function KolejnaPot2(liczba) {
    var pom = 1;

    //Zwraca zawsze kolejna potege 2 nawet jesli liczba
    //jest potega 2
    do {
        pom *= 2;
    } while(pom < liczba);
    return pom;
}

//Zwraca do koterej potegi musi byc podniesiona 2 aby otrzymac dana liczbe
function KtoraPotega2(liczba) {
    var pom = 1, i = 0;
    do {
        i++;
        pom *= 2;
    } while(pom < liczba);
    return i;
}

//Pomocnicza funkcja zwracajaca kolejne potegi 2
function DzielnikKolejneRundy(runda){
    var pom = 1;
    for(var i = 0; i < runda; i++)
    {
        pom *= 2;
    }
    return pom;
}

//Pomieszanie tablicy przy uzyciu algorytmu Fisher-Yates
function pomieszajTablice(tab) {
    for (var i = tab.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tab[i];
        tab[i] = tab[j];
        tab[j] = temp;
    }
    return tab;
}

//Ilosc stron w Paginatorze
function LiczbaStron() {
    var iloscGraczy = JSON.parse(localStorage.getItem('Uczestnicy')).length;
    var liczbaStron = Math.floor(iloscGraczy / 10);
    if(iloscGraczy % 10!=0)
        liczbaStron++;
    return liczbaStron;
}

function LiczbaGraczy() {
    return JSON.parse(localStorage.getItem('Uczestnicy')).length;
}