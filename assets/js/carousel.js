function Carousel(objOptions) {
  var _this = this,
      opt = objOptions;

  this.options = {
    'nav'         :opt.nav || 'true',
    'prevNav'     :opt.prevNav || '<',
    'nextNav'     :opt.nextNav || '>',
    'pagination'  :opt.pagination || 'true',
    'autoPlay'    :opt.autoPlay || 'false',
    'setPosition' :(opt.goTo-1) || '0',
    'gap'         :opt.gap || '0',
    'stayTime'    :opt.stayTime || '5000',
    'theme'       :opt.theme || 'carousel-theme'
  };

  var elemId = opt.elemID || 'carousel';

  this.elemId = elemId;
  this.main = document.getElementById(this.elemId);
  this.curPosition = this.options.setPosition;
  this.outerWrapper = this.getClassElement('wrapper_outer');
  this.innerWrapper = this.getClassElement('wrapper_inner');
  this.pagination = this.getClassElement('pagination');
  this.length = this.innerWrapper.children.length;

  this.init = function(){
    setCarousel();
    showPagination();
    autoPlay();
  }
  this.init();

  function autoPlay(){
    if(_this.options.autoPlay == 'true'){
      setInterval(function(){
        _this.curPosition = _this.curPosition<(_this.length-1)?_this.curPosition:-1;
        moveNext();
      }, _this.options.stayTime);
    }
  }

  function showPagination(){
    if(_this.options.pagination == 'true'){
      var tempNode = '';

      for(var i=0; i < _this.length; i++){
        tempNode = tempNode + '<div class="page" data-index="'+ i +'"></div>';
      }

      _this.pagination.innerHTML = tempNode;

      _this.pagination = _this.getClassElement('pagination');
      _this.pagination.addEventListener('click', paginationClickHandler);
      
      _this.moveTo(_this.curPosition);
    }else{
      _this.pagination.remove();
    }
  }

  function paginationClickHandler(e){
    _this.moveTo(e.target.getAttribute('data-index'));
  }

  function moveNext(){
    _this.curPosition++;
    _this.curPosition = _this.curPosition>(_this.length-1)?(_this.length-1):_this.curPosition;
    _this.moveTo(_this.curPosition);
  };

  function setCarousel(){
    _this.main.classList.add(_this.options.theme);
    _this.innerWrapper.style.width = (_this.innerWrapper.children[0].offsetWidth * _this.length) + 'px';
    _this.innerWrapper.style.left = -(_this.options.gap) + 'px';

    for(child in _this.innerWrapper.children){
      if(_this.innerWrapper.children[child].tagName == 'DIV'){
        _this.innerWrapper.children[child].style.padding = '0px ' + _this.options.gap;
      }
    }
  };
}

//Paging circle active/deactive.
Carousel.prototype.setActivePaging = function(index){
  var val;

  for(var i=0; i<this.length; i++){
    this.pagination.childNodes[i].classList.remove('active');

    if(this.pagination.childNodes[i].getAttribute('data-index') == index){
      val = i;
    }
  }

  this.pagination.childNodes[val].classList.add('active');
}

//Thumbnail placing
Carousel.prototype.moveTo = function(index){
  var curPos = -(this.innerWrapper.children[0].offsetWidth * index);
  var termPoint = this.outerWrapper.offsetWidth - this.innerWrapper.offsetWidth;

  if(this.options.pagination == 'true'){
    this.setActivePaging(index);
  }

  this.curPosition = index;

  curPos = curPos>=termPoint?curPos:termPoint;
  this.innerWrapper.style.left = curPos + 'px';
}

//Get element by class name.
Carousel.prototype.getClassElement = function(className){
  var tempNode = this.main.getElementsByClassName(className)[0];
  return tempNode;
}



var firstCarousel = new Carousel({
  'elemID': 'carousel',
  'nav': 'true',
  'prevNav' : '<',
  'nextNav' : '>',
  'pagination' : 'true',
  'autoPlay' : 'false',
  'gap' : '5px',
  'stayTime' : '5000',
  'theme' : 'my-theme'
});