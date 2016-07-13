var _clicker;

var isReveled;
var isShooterReveled;

export default class Clicker {
  constructor() {

    _clicker = this;

    this.numScrap = 0;

    this.robotsTypeE = {
      count: 0,
      cost: 10,
      scrap: 1
    };

    this.robotsTypeZ = {
      count: 0,
      cost: 250,
      scrap: 10
    };

    this.ui = {
      total: $('#total'),
      x1: $('#1x'),
      build1x: $('#build-1x'),
      x10: $('#10x'),
      build10x: $('#build-10x'),
      weapons: $('#weapons')
    };

    $("#gather-scrap").click(function(){
      _clicker.numScrap++;
      _clicker.updateScrapText();
    });


    this.ui.build1x.click(function(){
    if (_clicker.numScrap < _clicker.robotsTypeE.cost) return;
      _clicker.updateScrapText();
      _clicker.robotsTypeE.count += 1;
      _clicker.numScrap -= _clicker.robotsTypeE.cost;
      _clicker.robotsTypeE.cost = Math.ceil(_clicker.robotsTypeE.cost * 1.25);
    });

    this.ui.build10x.click(function(){
      if (_clicker.numScrap < _clicker.robotsTypeZ.cost) return;
      _clicker.updateScrapText();
      _clicker.robotsTypeZ.count += 1;
      _clicker.numScrap -= _clicker.robotsTypeZ.cost;
      _clicker.robotsTypeZ.cost = Math.ceil(_clicker.robotsTypeZ.cost * 1.25);
    });

    this.ui.weapons.click(function(){
      console.log('weapon upgrades');
      localStorage.setItem("bulletHealth", 1000); 
    })


    this.gameLoop();
    this.load();
  }

   ////////////////////////////UI UPDATE
  updateScrapText(){
    this.ui.total.text(this.numScrap);
    this.ui.x1.text(this.robotsTypeE.count);
    this.ui.build1x.text("Build (" + this.robotsTypeE.cost + ")");
    this.ui.x10.text(this.robotsTypeZ.count)
    this.ui.build10x.text("Build (" + this.robotsTypeZ.cost + ")");
    // console.log(_clicker.numScrap);

//don't need to show every frame!! 
    if(this.numScrap > 250 || isReveled){
      isReveled = true;
      $('#secondBtn').show();
    } 

    if(this.numScrap > 500 || isShooterReveled){
      isShooterReveled = true;
      $('#btn2').show();
    }

    if(this.numScrap > 1000){
      this.ui.weapons.show();
    }


  }

  gameLoop(){
    _clicker.numScrap += Math.ceil(_clicker.robotsTypeE.count * _clicker.robotsTypeE.scrap);
    _clicker.numScrap += Math.ceil(_clicker.robotsTypeZ.count * _clicker.robotsTypeZ.scrap);
    _clicker.updateScrapText();
    window.setTimeout(_clicker.gameLoop, 1000);
  }

  load(){
    let saveData = JSON.parse(localStorage.getItem('saveData'));
    if(saveData){
      this.numScrap = saveData.numScrap;
      this.robotsTypeE = saveData.robotsTypeE;
      this.robotsTypeZ = saveData.robotsTypeZ;
    }
    console.log(saveData);
    this.autoSave();
  }

  autoSave(){
    let saveData = JSON.stringify({numScrap:_clicker.numScrap, robotsTypeE:_clicker.robotsTypeE, robotsTypeZ:_clicker.robotsTypeZ});
    localStorage.setItem("saveData", saveData); 
    window.setTimeout(_clicker.autoSave, 5000);
  }

}


