/*CMPS3141-HCI - AS1-23S1
Collaborators:
Date:
 */
import { createApp } from "https://mavue.mavo.io/mavue.js";

let app = createApp({
	data: {
		assessments: {
			project: null,
			prgmSet: null,
			Test: null,
			FExam: null
		},
		homeworks: [null],
		Tests: [null]
		
	},

	computed: {
		/**
		 * Final grade in the class (number)
		 */
		calculatedGrade () {
			let p = this.assessments;
			return 0.25 * p.project + 0.05 * p.prgmSet + 0.25 * this.homeworkAverage;
		},

		/**
		 * Returns the average of all homeworks that have been graded (number)
		 */
		homeworkAverage () {
			let done = 0;
			let sum = 0;

			for (let hw of this.homeworks) {
				// Check that it is a number, and the number is non-negative
				if (hw >= 0) {
					sum += hw;
					done++;
				}
			}

			return sum / done;
		}


	},

	methods: {
		/**
		 * Adds a new blank homework to the list.
		 * Does not prevent more homeworks than 5 from being added.
		 */
		addHomework() {
			this.homeworks.push(null);
		}

	}
}, "#grade_calc");