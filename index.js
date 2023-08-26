/*CMPS3141-HCI - AS1-23S1
Collaborators: Duane Arzu
Date: 8/25/2023
 */
import { createApp } from "https://mavue.mavo.io/mavue.js";

let app = createApp({
	data: {
		assessments: {
			project: null,
			prgmSet: null,
			homework: null,
			Test: null,
			FExam: null
		},
		homeworks: [null],
		Tests: [null]
	},

	computed: {
		calculatedGrade() {
			let p = this.assessments;
			let grade = 0.25 * p.project + 0.05 * p.prgmSet + 0.25 * this.averageWithNulls(this.homeworks) + 0.20 * this.averageWithNulls(this.Tests) + 0.25 * p.FExam;
			return grade || 0;
		},

		averageWithNulls(arr) {
			let sum = 0;
			let count = 0;

			for (let val of arr) {
				if (val !== null && !isNaN(val) && val >= 0) {
					sum += parseFloat(val);
					count++;
				}
			}

			return count > 0 ? sum / count : 0;
		}
	},

	methods: {
		addHomework() {
			let newVal = this.getInputValue("HW.value");
			this.addToArrayWithLimit(this.homeworks, newVal, 5, "homeworksGrade");
		},

		addTest() {
			let newVal = this.getInputValue("test.value");
			this.addToArrayWithLimit(this.Tests, newVal, 2, "testsGrades");
		},

		addToArrayWithLimit(arr, newVal, limit, displayId) {
			if (arr.length < limit && newVal >= 0 && newVal <= 100) {
				arr.push(newVal);
			} else {
				let alertMsg = "";
				if (newVal < 0) alertMsg = "Negative value is invalid";
				else if (newVal > 100) alertMsg = "Value has exceeded limit";
				else if (arr.length >= limit) alertMsg = "Limit of values has been reached";
				if (alertMsg) alert(alertMsg);
			}

			if (arr !== null) {
				document.getElementById(displayId).innerText = arr.filter(val => val !== null).join(" | ");
			}
		},

		resetForm() {
			this.assessments.project = null;
			this.assessments.prgmSet = null;
			this.assessments.homework = null;
			this.assessments.Test = null;
			this.assessments.FExam = null;

			this.homeworks = [null];
			this.Tests = [null];

			this.clearGradeDisplay("homeworksGrade");
			this.clearGradeDisplay("testsGrades");
		},

		getInputValue(id) {
			return parseFloat(document.getElementById(id).value);
		},

		clearGradeDisplay(id) {
			document.getElementById(id).innerText = "";
		}
	}
}, "#grade_calc");
