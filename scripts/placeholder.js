/*
 * Custom HTML5 Placeholder
 *
 * @author  Kamil Brenk <kontakt@kamilbrenk.pl>
 */
function Placeholder(label, options) {
    this.label = jQuery(label);
    this.field = jQuery('#' + this.label.attr('for'));
    this.options = jQuery.extend({'hiddenClass': 'placeholder-hidden', 'focusClass': 'placeholder-focus'}, options);

    if (!this.field.length)
        return;

    this.field.on({
        'focus': jQuery.proxy(this, 'focus'),
        'blur': jQuery.proxy(this, 'blur'),
        'focus blur keyup input change onpropertychange': jQuery.proxy(this, 'check')
    });

    if (this.field.is('textarea'))
        jQuery(window)
            .on('resize.placeholder', jQuery.proxy(this, 'resize'))
            .trigger('resize.placeholder');

    setTimeout(jQuery.proxy(this, 'check'), 1);
}

Placeholder.prototype.focus = function() {
    if (!this.label.hasClass(this.options.hiddenClass))
        this.label.addClass(this.options.focusClass);
}

Placeholder.prototype.blur = function() {
    this.label.removeClass(this.options.focusClass);
}

Placeholder.prototype.resize = function() {
    this.label.height(this.field.outerHeight());
}

Placeholder.prototype.check = function() {
    if (this.field[0].value.length)
        this.label.addClass(this.options.hiddenClass).removeClass(this.options.focusClass);
    else {
        this.label.removeClass(this.options.hiddenClass);
        if (this.field.is(':focus'))
            this.label.addClass(this.options.focusClass);
    }
}

jQuery.fn.placeholder = function(options) {
    return this.each(function() {
        return new Placeholder(this, options);
    });
}
