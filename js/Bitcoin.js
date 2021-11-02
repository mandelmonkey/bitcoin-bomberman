Bitcoin = Entity.extend({
    position: {},
    bmp: null,
    type: "bitcoin",
    size: {
        w: 28,
        h: 28
    },
    init: function(position) {
       
        this.position = position;


        var spriteSheet = new createjs.SpriteSheet({
            images: [gGameEngine.bitcoinImg],
            frames: {
                width: this.size.w,
                height: this.size.h,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [0, 4, "idle", 0.2]
            }
        });
        this.bmp = new createjs.Sprite(spriteSheet);
        this.bmp.gotoAndPlay('idle');
         
       var pixels = Utils.convertToBitmapPosition(position);
        this.bmp.x = pixels.x;
        this.bmp.y = pixels.y;
        this.bmp.sourceRect = new createjs.Rectangle( 28, 0, 28, 28);
        gGameEngine.stage.addChild(this.bmp);
    },

    destroy: function() {
        gGameEngine.stage.removeChild(this.bmp);
        Utils.removeFromArray(gGameEngine.bonuses, this);
    }
});