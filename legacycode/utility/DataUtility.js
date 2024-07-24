/**
 * Data utility contains methods to format the data.
 */

class DataUtility {

    /**
     * Returns date into 'YYYY-MM-DD' format.
     * @param {*} d 
     */
    static formatDate(d) {
        var str = JSON.stringify(d);
        console.log('MySQLdate:', str);
        if (d) {
            try {
                return d.toISOString().split('T')[0];
            } catch (err) {
                return '';
            }
        }
        else {
            return d
        }
    }
}

module.exports = DataUtility;
