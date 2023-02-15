const Enames = document.getElementById("name");
const ehist = document.getElementById("dat");
const Eemail = document.getElementById("email");
const subbt = document.getElementById("submit");
const edob = document.getElementById("dob");
const etac = document.getElementById("acceptTerms");
const epassword = document.getElementById("password");

const date = new Date();
let lis_list = []
const dateValidity = (start_date) => {
    const date_use=start_date.replace("-","/")

    let day_dateq;

    const date_user=date_use.split("/").map((d) => Number(d))

    let e;
    let day_dasste;

    const year_date = (date_user[0] >= (date.getFullYear() - 55) && date_user[0] <= (date.getFullYear() - 18))
    let month_date;
    let day_date;
    if (date_user[0] === date.getFullYear() - 55) {
        month_date = date_user[1] >= (date.getMonth() + 1)
        day_date = date_user[2] >= (date.getDate())
    } else if (year_date) {
        month_date = true
        day_date = true
    } else if (date_user[0] === date.getFullYear() - 18) {
        month_date = date_user[1] <= (date.getMonth() + 1)
        day_date = date_user[2] <= (date.getDate())
    } else {
        month_date = false
        day_date = false
    }
    done=year_date && month_date && day_date;
    return done
}

const vaildif = (element) => {
    return element.validity.valid
}

const digits = (num) => {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
const sendStorage = (name, email, password, dob, terms) => {
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    }
    lis_list.push(userData)
    localStorage.setItem('userData', JSON.stringify(lis_list))
}


subbt.addEventListener("click", () => {
    const date_user = edob.value

    if (!dateValidity(date_user)) {
        edob.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        edob.setCustomValidity("")
    }

    const allValid = vaildif(Enames) && vaildif(Eemail) && vaildif(epassword) && vaildif(edob)

    if (allValid) {
        sendStorage(Enames.value, Eemail.value, epassword.value, edob.value, etac.checked)
    }
})
const getStorage = () => {
    lis_list = JSON.parse(localStorage.getItem("userData"))
    if (lis_list === null) {
        lis_list = []
    } else {
        const view = lis_list.map((entry) => {
            let lrows = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                lrows += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${lrows}</tr>`
        })
        ehist.innerHTML += view.join("\n")
    }
}



getStorage()