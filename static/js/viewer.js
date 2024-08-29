window.totalColumns = 0;
$(function () {
    // The event listener for the file upload
    document.getElementById('btnFileUpload').addEventListener('change', upload, false);

    // Method that checks that the browser supports the HTML5 File API
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            isCompatible = true;
        }
        return isCompatible;
    }

    // Method that reads and processes the selected file
    function upload(evt) {
        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');
        } else {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (event) {
                /*var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                json_data = $.csv.toObjects(csvData);*/
                json_data = event.target.result;
                window.jsonData = json_data;
                display(json_data);
            };
            reader.onerror = function () {
                alert('Unable to read ' + file.fileName);
            };
        }
    }
});

function get_badge(text) {
    badge_html = text;
    if (text === 'Good') {
        badge_html = `<span class="badge" style="background-color: #5cb85c; color: white;">Good</span>`;
    }
    if (text === 'Fair') {
        badge_html = `<span class="badge" style="background-color: #FA7A48; color: white;">Fair</span>`;
    }
    if (text === 'Poor') {
        badge_html = `<span class="badge" style="background-color: #e60001; color: white;">Poor</span>`;
    }
    if (text === 'Mild') {
        badge_html = `<span class="badge" style="background-color: #F8D568; color: white;">Mild</span>`;
    }
    if (text === 'Moderate') {
        badge_html = `<span class="badge" style="background-color: #FA7A48; color: white;">Moderate</span>`;
    }
    if (text === 'Severe') {
        badge_html = `<span class="badge" style="background-color: #e60001; color: white;">Severe</span>`;
    }
    return badge_html;
}

function populate_post_daily_checkin(dose_num, day_num, checkin) {
    started_on = `#td${dose_num}aDay${day_num}StartedOn`;
    $(started_on).html(checkin['STARTED_ON']);
    duration = `#td${dose_num}aDay${day_num}Duration`;
    $(duration).html(checkin['DURATION_MINS']);
    feeling_today = `#td${dose_num}aDay${day_num}FeelingToday`;
    $(feeling_today).html(get_badge(checkin['FEELING_TODAY']));
    //td1aDay14DescribeSymptoms
    symptoms_description = `#td${dose_num}aDay${day_num}DescribeSymptoms`;

    $(symptoms_description).html(checkin['SD_MEDDRA']);

    //td1aDay0Work, td1aDay0Activities, td1aDay0Doctor
    health_impact = checkin['HEALTH_IMPACT'].toString();
    missed_work = '';
    if (health_impact.includes('Be unable to work')) {
        missed_work = 'Yes';
    }
    missed_activities = '';
    if (health_impact.includes('Be unable to do your normal daily activities')) {
        missed_activities = 'Yes';
    }
    get_care = '';
    if (health_impact.includes('Get care from a doctor or other healthcare professional')) {
        get_care = 'Yes';
    }
    missed_work_cell = `#td${dose_num}aDay${day_num}Work`;
    $(missed_work_cell).html(missed_work);
    missed_activities_cell = `#td${dose_num}aDay${day_num}Activities`;
    $(missed_activities_cell).html(missed_activities);
    get_care_cell = `#td${dose_num}aDay${day_num}Doctor`;
    $(get_care_cell).html(get_care);

    //td1aDay0HealthConsultation, td1aDay0Clinic, td1aDay0Emergency, td1aDay0Hospitalization, td1aDay0Other
    healthcare_visits = checkin['HEALTHCARE_VISITS'].toString();

    care_consultation = '';
    if (healthcare_visits.includes('Telehealth, virtual health, or email health consultation')) {
        care_consultation = '<i class="fas fa-exclamation-triangle" style="color: #F8D568;"></i>';
    }
    care_clinic = '';
    if (healthcare_visits.includes('Outpatient clinic or urgent care clinic visit')) {
        care_clinic = '<i class="fas fa-exclamation-triangle" style="color: #FA7A48;"></i>';
    }
    care_emergency = '';
    if (healthcare_visits.includes('Emergency room or emergency department visit')) {
        care_emergency = '<i class="fas fa-exclamation-triangle" style="color: #e60001;"></i>';
    }
    care_hospitalization = '';
    if (healthcare_visits.includes('Hospitalization')) {
        care_hospitalization = '<i class="fas fa-exclamation-triangle" style="color: #e60001;"></i>';
    }
    care_consultation_cell = `#td${dose_num}aDay${day_num}HealthConsultation`
    $(care_consultation_cell).html(care_consultation);
    care_clinic_cell = `#td${dose_num}aDay${day_num}Clinic`
    $(care_clinic_cell).html(care_clinic);
    care_emergency_cell = `#td${dose_num}aDay${day_num}Emergency`
    $(care_emergency_cell).html(care_emergency);
    care_hospitalization_cell = `#td${dose_num}aDay${day_num}Hospitalization`
    $(care_hospitalization_cell).html(care_hospitalization);
    care_other = `#td${dose_num}aDay${day_num}Other`;
    $(care_other).html(checkin['HCVO_MEDDRA']);

    //td1aDay14CovidPositive, td1aDay14CovidPositiveDate, td1aDay14Pregnant,

    covid_positive_cell = `#td${dose_num}aDay${day_num}CovidPositive`
    $(covid_positive_cell).html(checkin['TESTED_POSITIVE']);
    covid_positive_date_cell = `#td${dose_num}aDay${day_num}CovidPositiveDate`
    $(covid_positive_date_cell).html(checkin['TESTED_POSITIVE_DATE']);
    pregnant_cell = `#td${dose_num}aDay${day_num}Pregnant`;
    $(pregnant_cell).html(checkin['PREGNANCY_TEST']);

    //td1aDay14HealthNow,  td1aDay14HealthNowComparison, td1aDay14VaccineRelated

    health_now_cell = `#td${dose_num}aDay${day_num}HealthNow`;
    $(health_now_cell).html(checkin['HEALTH_NOW']);
    health_now_comparison_cell = `#td${dose_num}aDay${day_num}HealthNowComparison`;
    $(health_now_comparison_cell).html(checkin['HEALTH_NOW_COMPARISON']);
    vaccine_related_cell = `#td${dose_num}aDay${day_num}VaccineRelated`;
    $(vaccine_related_cell).html(checkin['VACCINE_CAUSED_HEALTH_ISSUES']);
}

function populate_daily_checkin(dose_num, day_num, checkin) {
    started_on = `#td${dose_num}Day${day_num}StartedOn`;
    $(started_on).html(checkin['STARTED_ON']);
    duration = `#td${dose_num}Day${day_num}Duration`;
    $(duration).html(checkin['DURATION_MINS']);
    feeling_today = `#td${dose_num}Day${day_num}FeelingToday`;
    $(feeling_today).html(get_badge(checkin['FEELING_TODAY']));
    fever = `#td${dose_num}Day${day_num}Fever`;
    $(fever).html(checkin['FEVER']);
    temperature = `#td${dose_num}Day${day_num}Temperature`;
    $(temperature).html(checkin['TEMPERATURE_READING']);
    temp_value = `#td${dose_num}Day${day_num}TempValue`;
    $(temp_value).html(checkin['TEMPERATURE_FAHRENHEIT']);
    pain = `#td${dose_num}Day${day_num}Pain`;
    $(pain).html(get_badge(checkin['PAIN']));
    redness = `#td${dose_num}Day${day_num}Redness`;
    $(redness).html(get_badge(checkin['REDNESS']));
    swelling = `#td${dose_num}Day${day_num}Swelling`;
    $(swelling).html(get_badge(checkin['SWELLING']));
    itching = `#td${dose_num}Day${day_num}Itching`;
    $(itching).html(get_badge(checkin['ITCHING']));

    //tdDay0Chills, tdDay0Headache, tdDay0JointPain, tdDay0MuscleAche, tdDay0Fatigue
    chills = `#td${dose_num}Day${day_num}Chills`;
    $(chills).html(get_badge(checkin['CHILLS']));
    headache = `#td${dose_num}Day${day_num}Headache`
    $(headache).html(get_badge(checkin['HEADACHE']));
    jointpain = `#td${dose_num}Day${day_num}JointPain`;
    $(jointpain).html(get_badge(checkin['JOINT_PAINS']));
    muscleache = `#td${dose_num}Day${day_num}MuscleAche`;
    $(muscleache).html(get_badge(checkin['MUSCLE_OR_BODY_ACHES']));
    fatigue = `#td${dose_num}Day${day_num}Fatigue`;
    $(fatigue).html(get_badge(checkin['FATIGUE']));
    //td1Day0Nausea, td1Day0Vomiting, td1Day0Diarrhea, td1Day0AbdominalPain, td1Day0RashOther
    nausea = `#td${dose_num}Day${day_num}Nausea`
    $(nausea).html(get_badge(checkin['NAUSEA']));
    vomiting = `#td${dose_num}Day${day_num}Vomiting`
    $(vomiting).html(get_badge(checkin['VOMITING']));
    diarrhea = `#td${dose_num}Day${day_num}Diarrhea`;
    $(diarrhea).html(get_badge(checkin['DIARRHEA']));
    abdominal_pain = `#td${dose_num}Day${day_num}AbdominalPain`;
    $(abdominal_pain).html(get_badge(checkin['ABDOMINAL_PAIN']));
    rash_other = `#td${dose_num}Day${day_num}RashOther`;
    $(rash_other).html(get_badge(checkin['RASH_OUTSIDE_INJECTION_SITE']));
    //td4Day0AnyOther
    any_other = `#td${dose_num}Day${day_num}AnyOther`
    $(any_other).html(checkin['SRO_MEDDRA']);

    //td1Day0Work, td1Day0Activities, td1Day0Doctor
    health_impact = checkin['HEALTH_IMPACT'].toString();
    missed_work = '';
    if (health_impact.includes('Be unable to work')) {
        missed_work = 'Yes';
    }
    missed_activities = '';
    if (health_impact.includes('Be unable to do your normal daily activities')) {
        missed_activities = 'Yes';
    }
    get_care = '';
    if (health_impact.includes('Get care from a doctor or other healthcare professional')) {
        get_care = 'Yes';
    }
    missed_work_cell = `#td${dose_num}Day${day_num}Work`;
    $(missed_work_cell).html(missed_work);
    missed_activities_cell = `#td${dose_num}Day${day_num}Activities`;
    $(missed_activities_cell).html(missed_activities);
    get_care_cell = `#td${dose_num}Day${day_num}Doctor`;
    $(get_care_cell).html(get_care);

    //td1Day0HealthConsultation, td1Day0Clinic, td1Day0Emergency, td1Day0Hospitalization, td1Day0Other
    healthcare_visits = checkin['HEALTHCARE_VISITS'].toString();

    care_consultation = '';
    if (healthcare_visits.includes('Telehealth, virtual health, or email health consultation')) {
        care_consultation = '<i class="fas fa-exclamation-triangle" style="color: #F8D568;"></i>';
    }
    care_clinic = '';
    if (healthcare_visits.includes('Outpatient clinic or urgent care clinic visit')) {
        care_clinic = '<i class="fas fa-exclamation-triangle" style="color: #FA7A48;"></i>';
    }
    care_emergency = '';
    if (healthcare_visits.includes('Emergency room or emergency department visit')) {
        care_emergency = '<i class="fas fa-exclamation-triangle" style="color: #e60001;"></i>';
    }
    care_hospitalization = '';
    if (healthcare_visits.includes('Hospitalization')) {
        care_hospitalization = '<i class="fas fa-exclamation-triangle" style="color: #e60001;"></i>';
    }
    care_consultation_cell = `#td${dose_num}Day${day_num}HealthConsultation`
    $(care_consultation_cell).html(care_consultation);
    care_clinic_cell = `#td${dose_num}Day${day_num}Clinic`
    $(care_clinic_cell).html(care_clinic);
    care_emergency_cell = `#td${dose_num}Day${day_num}Emergency`
    $(care_emergency_cell).html(care_emergency);
    care_hospitalization_cell = `#td${dose_num}Day${day_num}Hospitalization`
    $(care_hospitalization_cell).html(care_hospitalization);
    //td4Day0Other
    care_other = `#td${dose_num}Day${day_num}Other`;
    $(care_other).html(checkin['HCVO_MEDDRA']);
}

function populate_dose_info(dose_num, mid_phrase, checkin) {
    if (mid_phrase === '-0-day-') {
        populate_daily_checkin(dose_num, 0, checkin);
    }
    if (mid_phrase === '-7-day-') {
        populate_daily_checkin(dose_num, 7, checkin);
    }
    if (mid_phrase === '-1-6-daily-') {
        if (days_since === 1) {
            populate_daily_checkin(dose_num, 1, checkin);
        } else if (days_since === 2) {
            populate_daily_checkin(dose_num, 2, checkin);
        } else if (days_since === 3) {
            populate_daily_checkin(dose_num, 3, checkin);
        } else if (days_since === 4) {
            populate_daily_checkin(dose_num, 4, checkin);
        } else if (days_since === '5') {
            populate_daily_checkin(dose_num, 5, checkin);
        } else if (days_since === '6') {
            populate_daily_checkin(dose_num, 6, checkin);
        } else if (days_since === '7') {
            populate_daily_checkin(dose_num, 7, checkin);
        }
    }
    if (mid_phrase === '-14-day-') {
        populate_post_daily_checkin(dose_num, 14, checkin);
    }
    if (mid_phrase === '-21-day-') {
        populate_post_daily_checkin(dose_num, 21, checkin);
    }
    if (mid_phrase === '-28-day-') {
        populate_post_daily_checkin(dose_num, 28, checkin);
    }
    if (mid_phrase === '-35-day-') {
        populate_post_daily_checkin(dose_num, 35, checkin);
    }
    if (mid_phrase === '-42-day-') {
        populate_post_daily_checkin(dose_num, 42, checkin);
    }
    if (mid_phrase === '-3-month-') {
        populate_post_daily_checkin(dose_num, 90, checkin);
    }
    if (mid_phrase === '-6-month-') {
        populate_post_daily_checkin(dose_num, 180, checkin);
    }
    if (mid_phrase === '-12-month-') {
        populate_post_daily_checkin(dose_num, 365, checkin);
    }
}

function display_json(data) {
    $('#preJSON').text(JSON.stringify(data, undefined, 2));
    sex = data['sex'];
    $('#tdSex').html(sex);
    zip_code = data['zip_code'];
    $('#tdZipCode').html(zip_code);
    registered_date = data['registered_date'];
    $('#tdRegisteredDate').html(registered_date);
    vax1_date = data['vaccine_info'][0]['VACCINATION_DATE'];
    $('#tdDose1VaxDate').html(vax1_date);
    vax1_coadministered = data['vaccine_info'][0]['COADMINISTERED'];
    $('#tdDose1Coadministered').html(vax1_coadministered);
    vax1_coadministered_vax = data['vaccine_info'][0]['COADMINISTERED_VAX'];
    $('#tdDose1CoadministeredVaccine').html(vax1_coadministered_vax);
    vaccine_info_list = data['vaccine_info']
    if (vaccine_info_list.length > 1) {
        vax2_date = vaccine_info_list[1]['VACCINATION_DATE'];
        $('#tdDose2VaxDate').html(vax2_date);
        vax2_coadministered = vaccine_info_list[1]['COADMINISTERED'];
        $('#tdDose2Coadministered').html(vax2_coadministered);
        vax2_coadministered_vax = vaccine_info_list[1]['COADMINISTERED_VAX']
        $('#tdDose2CoadministeredVaccine').html(vax2_coadministered_vax);
    }
    if (vaccine_info_list.length > 2) {
        vax3_date = vaccine_info_list[2]['VACCINATION_DATE'];
        $('#tdDose3VaxDate').html(vax3_date);
        vax3_coadministered = vaccine_info_list[2]['COADMINISTERED'];
        $('#tdDose3Coadministered').html(vax3_coadministered);
        vax3_coadministered_vax = vaccine_info_list[2]['COADMINISTERED_VAX']
        $('#tdDose3CoadministeredVaccine').html(vax3_coadministered_vax);
    }
    if (vaccine_info_list.length > 3) {
        vax4_date = vaccine_info_list[3]['VACCINATION_DATE'];
        $('#tdDose4VaxDate').html(vax4_date);
        vax4_coadministered = vaccine_info_list[3]['COADMINISTERED'];
        $('#tdDose4Coadministered').html(vax4_coadministered);
        vax4_coadministered_vax = vaccine_info_list[3]['COADMINISTERED_VAX']
        $('#tdDose4CoadministeredVaccine').html(vax4_coadministered_vax);
    }
    checkins = data['checkin_info'];
    checkins.forEach((checkin, i) => {
        dose_num = checkin['DOSE_NUM'];
        mid_phrase = checkin['MID_PHRASE'];
        checkin_type = checkin['TYPE'];
        days_since = checkin['DAYS_SINCE'];
        if (dose_num === 'dose1') {
            populate_dose_info(1, mid_phrase, checkin);
        } else if (dose_num === 'dose2') {
            populate_dose_info(2, mid_phrase, checkin);
        } else if (dose_num === 'dose3') {
            populate_dose_info(3, mid_phrase, checkin);
        } else if (dose_num === 'dose4') {
            populate_dose_info(4, mid_phrase, checkin);
        }
    });
}

function display(json_data) {
    data = JSON.parse(json_data);
    display_json(data);
}

String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};