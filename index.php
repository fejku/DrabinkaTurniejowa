<?php require_once './Drabinka.php'; ?>
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="">
      <meta name="author" content="">
      <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title>Starter Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="./css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
        <link href="./css/style.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

  </head>

  <body>

    <div class="container">

        <div class="row">
            <div class="col-xs-12">
                <label>Lista uczestników:</label>
            </div>
        </div>
        <strong id="a11">a</strong><strong id="a22">b</strong><strong id="a33">c</strong><strong id="a44">d</strong>
        <div class="row">
            <div class="col-xs-6">
                <ol id="wyswUczestnicy"></ol>
            </div>
        </div>
        
        <div class="row">
            <div class="col-xs-12">
                <label>Dodaj uczestników:</label>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Nazwa" id="gracz">
                    <span class="input-group-btn">
                        <button type="submit" class="btn btn-default" id="btnDodaj">Dodaj</button>
                    </span>
                </div><!-- /input-group -->
                <span class="help-block">Błąd.</span>
            </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->
        <div class="row">
            <p class="bg-danger"></p>
        </div>

        <div id="dTabela">
            <div class="row"><button id="btnRysuj" class="btn">Rysuj</button></div>
        </div>
        
        <div id="dDrabinka"></div>
        
        
        
        
<!--        <div id="tTabela">
            <div class="runda1">
                <div class="naglowek">
                    Runda 1
                </div>
                <div class="odstep_r1"></div>
                <div class="mecz_1">
                    <div class="runda runda1_gora">
                       <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                       <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda1_przerwa1">
                    &nbsp;
                </div>
                <div class="mecz_2">
                    <div class="runda runda1_gora">
                        <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                        <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda1_przerwa2">
                    &nbsp;
                </div>
                <div class="mecz_1">
                    <div class="runda runda1_gora">
                       <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                       <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda1_przerwa1">
                    &nbsp;
                </div>
                <div class="mecz_2">
                    <div class="runda runda1_gora">
                        <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                        <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda1_przerwa2">
                    &nbsp;
                </div>
                <div class="mecz_1">
                    <div class="runda runda1_gora">
                       <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                       <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda1_przerwa1">
                    &nbsp;
                </div>
                <div class="mecz_2">
                    <div class="runda runda1_gora">
                        <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                        <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda1_przerwa2">
                    &nbsp;
                </div>
                <div class="mecz_1">
                    <div class="runda runda1_gora">
                       <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                       <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda1_przerwa1">
                    &nbsp;
                </div>
                <div class="mecz_2">
                    <div class="runda runda1_gora">
                        <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                        <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="odstep_r1"></div>
            </div>
            <div class="runda2">
                <div class="naglowek">
                    Runda 2
                </div>
                <div class="odstep_r2"></div>
                <div class="mecz_1">
                    <div class="runda runda1_gora">
                       <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                       <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda2_przerwa1">
                    &nbsp;
                </div>
                <div class="mecz_2">
                    <div class="runda runda1_gora">
                        <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                        <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda2_przerwa2">
                    &nbsp;
                </div>
                <div class="mecz_1">
                    <div class="runda runda1_gora">
                       <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                       <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda2_przerwa1">
                    &nbsp;
                </div>
                <div class="mecz_2">
                    <div class="runda runda1_gora">
                        <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                        <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="odstep_r2"></div>
            </div>
            <div class="runda3">
                <div class="naglowek">
                    Runda 3
                </div>
                <div class="odstep_r3"></div>
                <div class="mecz_1">
                    <div class="runda runda1_gora">
                       <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                       <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="runda3_przerwa1">
                    &nbsp;
                </div>
                <div class="mecz_2">
                    <div class="runda runda1_gora">
                       <div class="nazwa">Nazwa_1</div><div class="wynik">0</div><div class="kreski">&nbsp;</div>
                    </div>
                    <div class="runda runda1_dol">
                       <div class="nazwa">Nazwa_2</div><div class="wynik">5</div><div class="kreski">&nbsp;</div>
                    </div>
                </div>
                <div class="odstep_r3"></div>
            </div>
        </div>
        <input type="text" id="ss"><button id="ss1">OK</button>-->
        <div id="sylwia"></div>
    <?php 
        $drab = new Drabinka();
        if(isset($_POST['gracze']))
        {
            $drab->AddMorePlayer($_POST['gracze']);
            
        }
        $drab->ShowPlayers();
    ?>

    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script type="text/javascript" src="./js/funkcje.js"></script>
  </body>
</html>
