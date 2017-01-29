/**
 * Get all of an element's parent elements up the DOM tree until a matching parent is found
 * @param  {Node}   elem     The element
 * @param  {String} parent   The selector for the parent to stop at
 * @param  {String} selector The selector to filter against [optionals]
 * @return {Array}           The parent elements
 */
var getParentsUntil = function ( elem, parent, selector ) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Setup parents array
    var parents = [];

    // Get matching parent elements
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

        if ( parent ) {
            if ( elem.matches( parent ) ) break;
        }

        if ( selector ) {
            if ( elem.matches( selector ) ) {
                parents.push( elem );
            }
            break;
        }

        parents.push( elem );

    }

    return parents;

};

// Examples
var elem = document.querySelector( '#some-element' );
var parentsUntil = getParentsUntil( elem, '.some-class' );
var parentsUntilByFilter = getParentsUntil( elem, '.some-class', '[data-something]' );
var allParentsUntil = getParentsUntil( elem );
var allParentsExcludingElem = getParentsUntil( elem.parentNode );