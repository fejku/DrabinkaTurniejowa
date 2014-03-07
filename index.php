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

  </head>

  <body>

    <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="mWynik" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label id="lGracz1" class="col-xs-10 control-label"></label>
                                <div class="col-xs-2">
                                    <input type="text" class="form-control" id="iGracz1" placeholder="0">
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lGracz2" class="col-xs-10 control-label"></label>
                                <div class="col-xs-2">
                                    <input type="text" class="form-control" id="iGracz2" placeholder="0">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Zamknij</button>
                        <button id="modalAccept" type="button" class="btn btn-primary" data-dismiss="modal">Zatwierdź</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="dDrabinka"></div>
        <div class="row"><div class="col-xs-12 col-xs-offset-3">
        <div id="dTabela">
            <div class="row">
                <div class="col-xs-6">
                <button id="btnRysuj" class="btn btn-success btn-block">Rysuj</button>
                </div>
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
                        <button type="submit" class="btn btn-primary" id="btnDodaj">Dodaj</button>
                    </span>
                </div><!-- /input-group -->
                <span class="help-block">Błąd.</span>
            </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->
        <div class="row">
            <p class="bg-danger"></p>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <label>Lista uczestników:</label>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <ol id="wyswUczestnicy"></ol>
                <div class="center">
                    <div id="paginator" class="pagination"></div>
                </div>
            </div>
        </div>
        </div></div>
    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script type="text/javascript" src="./js/bootstrap.min.js"></script>
    <script type="text/javascript" src="./js/bootstrap-paginator.min.js"></script>
    <script type="text/javascript" src="./js/funkcje.js"></script>
  </body>
</html>
