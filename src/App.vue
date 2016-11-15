<template>
    <div class="container" style="padding : 15px">
        <div class="row">
            <div class="col-sm-offset-5">
                <h1>Savings calculator</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="nbEmployees" style="text-align: right" class="col-sm-8">Amount of Sales
                            Employees</label>
                        <div class="col-sm-4">
                            <input type="number" id="nbEmployees" v-model="input.nbEmployees">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="quotesPerMonthPerEmployee" style="text-align: right" class="col-sm-8">Quotes per
                            Month per Employee</label>
                        <div class="col-sm-4">
                            <input type="number" id="quotesPerMonthPerEmployee"
                                   v-model="input.quotesPerMonthPerEmployee">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="avCostPerH" style="text-align: right" class="col-sm-8">Average cost per
                            hour</label>
                        <div class="col-sm-4">
                            <input type="number" id="avCostPerH" v-model="input.avCostPerH">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="quoteCheck" style="text-align: right" class="col-sm-8">Quote Check</label>
                        <div class="col-sm-4">
                            <input type="number" step="0.1" id="quoteCheck" v-model="input.quoteCheck.manual">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="priceCalc" style="text-align: right" class="col-sm-8">Price Calculation</label>
                        <div class="col-sm-4">
                            <input type="number" step="0.1" id="priceCalc" v-model="input.priceCalc.manual">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="ndaCheck" style="text-align: right" class="col-sm-8">NDA Check</label>
                        <div class="col-sm-4">
                            <input type="number" step="0.1" id="ndaCheck" v-model="input.ndaCheck.manual">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="timeOffer" style="text-align: right" class="col-sm-8">Time for creating offer
                        </label>
                        <div class="col-sm-4">
                            <input type="number" step="0.1" id="timeOffer" v-model="input.timeOffer.manual">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="avTimeEmail" style="text-align: right" class="col-sm-8">Average time for writing
                            an
                            Email</label>
                        <div class="col-sm-4">
                            <input type="number" step="0.1" id="avTimeEmail" v-model="input.avTimeEmail.manual">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="avTimeCall" style="text-align: right" class="col-sm-8">Average time per phone
                            call</label>
                        <div class="col-sm-4">
                            <input type="number" step="0.1" id="avTimeCall" v-model="input.avTimeCall.manual">
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-2"></div>
            <div class="col-sm-7">
                <div class="row">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Accumulated Cost Savings</th>
                            <th v-for="i in [1,2,3,4,12]">Month {{i}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Online Quoting</th>
                            <td v-for="i in [1,2,3,4,12]">{{Math.round(savingsPerMonth.online * i)}}</td>
                        </tr>
                        <tr>
                            <th>Digital Quoting</th>
                            <td v-for="i in [1,2,3,4,12]">{{Math.round(savingsPerMonth.digital * i)}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row" id="chartContainer">
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js'
import $ from 'jquery'

function sumTime(type, input) {
    /**
    Returns the total time of a type of quotes among "manual", "online", "digital"
    **/
    var sum = 0;
    var a = ["quoteCheck", "priceCalc", "ndaCheck", "timeOffer", "avTimeEmail", "avTimeCall"];
    for (var i = 0; i < a.length; i++) {
        sum = sum + input[a[i]][type]
    }
    return sum
}

export default {
  name: 'app',
  data () {
    return {
            val: 32,
            test: "vaervdf",
            array: ["edfci", "zedrf"],
            kreatizeCostPerM: {
                manual: 0,
                online: 500,
                digital: 1500
            },
            input: {
                nbEmployees: 2,
                quotesPerMonthPerEmployee: 10,
                avCostPerH: 75,
                quoteCheck: {
                    manual: 1,
                    online: 0,
                    digital: 0
                },
                priceCalc: {
                    manual: 4,
                    online: 4,
                    digital: 0
                },
                ndaCheck: {
                    manual: 0.5,
                    online: 0,
                    digital: 0
                },
                timeOffer: {
                    manual: 0.5,
                    online: 0.166666666666667,
                    digital: 0
                },
                avTimeEmail: {
                    manual: 1,
                    online: 0,
                    digital: 0
                },
                avTimeCall: {
                    manual: 1,
                    online: 0,
                    digital: 0.2
                },
            }
        }
  },
  computed: {
            doubleVal: function () {
                return this.val * 2
            },
            totalOfferTime: function () {
                return {
                    manual: sumTime("manual", this.input),
                    online: sumTime("online", this.input),
                    digital: sumTime("digital", this.input)
                }
            },
            costPerQuote: function () {
                return {
                    manual: this.input.avCostPerH * this.totalOfferTime.manual,
                    online: this.input.avCostPerH * this.totalOfferTime.online,
                    digital: this.input.avCostPerH * this.totalOfferTime.digital,

                }
            },
            hrCostPerM: function () {
                return {
                    manual: this.costPerQuote.manual * this.input.nbEmployees * this.input.quotesPerMonthPerEmployee,
                    online: this.costPerQuote.online * this.input.nbEmployees * this.input.quotesPerMonthPerEmployee,
                    digital: this.costPerQuote.digital * this.input.nbEmployees * this.input.quotesPerMonthPerEmployee
                }
            },
            totalCostPerM: function () {
                return {
                    manual: this.kreatizeCostPerM.manual + this.hrCostPerM.manual,
                    online : this.kreatizeCostPerM.online + this.hrCostPerM.online,
                    digital : this.kreatizeCostPerM.digital + this.hrCostPerM.digital,
                }
            },
            savingsPerMonth : function () {
                return {
                    online : this.totalCostPerM.manual - this.totalCostPerM.online,
                    digital : this.totalCostPerM.manual - this.totalCostPerM.digital
                }
            }

        },
        mounted : function(){
            this.updateChart();
        },
        watch : {
            savingsPerMonth : function(){
                this.updateChart();
            }
        },
        methods : {
            updateChart : function(){
                var data = {
                    labels: ["Month 1", "Month 2", "Month 3", "Month 4", "1 Year"],
                    datasets: [{
                            label: "Online",
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1,
                            data: [this.savingsPerMonth.online, this.savingsPerMonth.online*2,
                            this.savingsPerMonth.online*3,this.savingsPerMonth.online*4,this.savingsPerMonth.online*12],
                        },{
                            label: "Digital",
                            backgroundColor: 'rgba(0, 99, 132, 0.2)',
                            borderWidth: 1,
                            data: [this.savingsPerMonth.digital, this.savingsPerMonth.digital*2,
                            this.savingsPerMonth.digital*3,this.savingsPerMonth.digital*4, this.savingsPerMonth.digital*12],
                        }
            ]};
            var opt = {
                animation : {
                    duration : 0
                }
            };
            $('#myChart').remove();
            $('#chartContainer').append('<canvas id="myChart"><canvas>');
            new Chart($("#myChart"), {
                type: 'bar',
                data: data,
                options: opt
            });
            }
        }

};
</script>
<style>
</style>
