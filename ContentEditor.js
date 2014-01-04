/**
* Created by michaelsokol on 28/12/2013.
*/
/// <reference path="libs/jquery.d.ts" />
/// <reference path="states/EditingState.ts" />
/// <reference path="states/PlaceHolderState.ts" />
var ContentEditor = (function () {
    function ContentEditor(el) {
        this.el = el;
        this.$el = $(el);

        if (!this.$el.length)
            throw 'No DOM element found.';

        this.placeHolderText = this.$el.data('placeholder');

        if (this.placeHolderText && this.placeHolderText.length) {
            this.changeState(PlaceHolderState._instance);
        } else {
            this.changeState(EditingState._instance);
        }

        this.initListeners();
    }
    ContentEditor.prototype.changeState = function (state) {
        this.state = state;
        state.initState(this);
    };

    ContentEditor.prototype.initListeners = function () {
        var _this = this;
        // Depending in the state, different things will be done.
        this.$el.on('mousedown blur keydown keyup', function (e) {
            var stateHandler = _this.state[e.type];
            stateHandler && stateHandler(_this, e);
        });
    };
    return ContentEditor;
})();
//# sourceMappingURL=ContentEditor.js.map
