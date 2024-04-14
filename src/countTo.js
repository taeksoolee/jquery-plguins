(function($) {
  const sleep = function (ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };
  
  const _set = function (value) {
    this.text(value.toString().padStart(this.data('degit'), '0'));
  };

  $.fn.countTo = async function() {
    const set = _set.bind(this);
    let from = Number(this.data('from'));
    const to = Number(this.data('to'));
    const duration = Number(this.data('duration'));

    if (isNaN(from) || isNaN(to) || isNaN(duration)) {
      console.warn('countTo ::: required from to duration');
      return;
    } else if (from === to) {
      set(to);
      return;
    }
    
    const diff = Math.max(from, to) - Math.min(from, to);
    const direction = from > to ? -1 : 1;
    const DELAY = 10;

    const totalStep = duration / DELAY;
    const added = direction === 1
      ? (direction) * (diff / totalStep)
      : (direction) * (diff / totalStep);

    // const start = Date.now();
    set(from);
    while(true) {
      await sleep(DELAY * .9); // 오차때문에
      from += added;
      if (direction === 1 ? from > to : from < to) {
        set(to);
        break;
      }
      set(parseInt(from));
    }
    // console.log(Date.now() - start);
  }
})(window.jQuery);