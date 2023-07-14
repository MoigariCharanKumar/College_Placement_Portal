function getDeadlineDays(deadline) {
    var now = new Date();
    var term = new Date(
      parseInt(deadline.slice(0, 4)),
      parseInt(deadline.slice(5, 7)) - 1,
      parseInt(deadline.slice(8,))
    );
    
    var Difference_In_Time = term.getTime() - now.getTime();
    var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
    
    return Difference_In_Days;
    }
    module.exports = {
        getDeadlineDays: getDeadlineDays
      };