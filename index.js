
var mortgageApp = angular.module('mortgageApp', []);

mortgageApp.controller('mortgageController', function mortgageController($scope) {

    function setDec(val, dec) {
        return parseFloat(parseFloat(val).toFixed(dec));
    }

    $scope.recalc = function () {

        $scope.rate = setDec($scope.rate, 4);
        $scope.price = setDec($scope.price, 2);
        $scope.loan = setDec($scope.loan, 2);
        $scope.years = setDec($scope.years, 0);
        $scope.payPerYear = setDec($scope.payPerYear, 0);
        $scope.op = setDec($scope.op,2);
        $scope.calculateLTV();
        $scope.calculatePayment();
        $scope.populateIntervals();
    };
    $scope.calculateLTV = function () {
        $scope.ltv = setDec($scope.loan / $scope.price * 100, 2);
    };
    $scope.populateIntervals = function () {
        $scope.intervals = [];
        var term = $scope.years * $scope.payPerYear;
        var nextBalance = $scope.loan;
        var nextEquity = setDec($scope.price - $scope.loan,2);
        for (var i = 1; i <= term; i++) {

            var obj = {};
            obj.paymentNum = i;
            obj.year = Math.ceil(i/$scope.payPerYear);
            obj.balance = nextBalance;
            obj.payment = setDec($scope.payment + $scope.op,2);
            obj.interest = setDec(obj.balance * ($scope.rate / 12), 2);
            obj.principle = setDec(obj.payment - obj.interest , 2);
            obj.equity = nextEquity;
            if(obj.balance>0){
            $scope.intervals.push(obj);
            nextBalance = setDec(obj.balance - obj.principle,2);
            nextEquity = setDec(obj.equity+obj.principle,2);
            } else {
                break;
            }
        }
    };
    $scope.calculatePayment = function () {
        /*
        ir - interest rate per month
        np - number of periods (months)
        pv - present value
        fv - future value (residual value)
        */
        var ir = $scope.rate / $scope.payPerYear;
        var np = $scope.years * $scope.payPerYear;
        var pv = $scope.loan;
        var fv = 0;
        var type = 0;
        var pmt, pvif;

        fv || (fv = 0);
        type || (type = 0);

        if (ir === 0)
            return -(pv + fv) / np;

        pvif = Math.pow(1 + ir, np);
        pmt = - ir * pv * (pvif + fv) / (pvif - 1);

        if (type === 1)
            pmt /= (1 + ir);
        var pmt = (ir * (pv * Math.pow((ir + 1), np) + fv)) / ((ir + 1) * (Math.pow((ir + 1), np) - 1));
        $scope.payment = setDec(pmt, 2);

    }

    $scope.intervals = []

    $scope.rate = 0.0154;
    $scope.price = 325000.00;
    $scope.loan = 260000.00;
    $scope.ltv = 0;
    $scope.years = 35;
    $scope.payPerYear = 12;
    $scope.payment = 0;
    $scope.op=0.00;
    $scope.calculateLTV();
    $scope.calculatePayment();
    $scope.populateIntervals();


});