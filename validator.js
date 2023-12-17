function Validator(options){

    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules = {}
    // Hàm thực hiện Validate
    function validate(inputElement, rule){
        
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rule của selector
        var rules = selectorRules[rule.selector];

        // Lặp và kiểm tra từng rule
        for(var i=0 ; i < rules.length; ++i){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }
        if(errorMessage){
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }
        else{
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }

    // Lấy element của form cần validate    
    var formElement = document.querySelector(options.form)
    if(formElement){
        // Thực hiện lặp qua từng rule và validate  
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;
            options.rules.forEach(function (rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid){
                    isFormValid = false;
                }
            });
           
            if(isFormValid){
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')

                    var formValues = Array.from(enableInputs).reduce(function(values,input){
                        values[input.name] = input.value;
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
            }
            else{
                formElement.submit();
            }
        }

        // Lặp qua mỗi Rule và xử lí, lắng nghe sự kiện blur, input
        options.rules.forEach(function (rule){
            // Lưu lại các rule trong input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
                selectorRules[rule.selector] = [rule.test];
            } 
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                // Xử lí trường hợp blur khỏi input
                inputElement.onblur = function(){
                   validate(inputElement, rule);
                }

                // Xử lí trường hợp người dùng nhập vào input
                inputElement.oninput = function(){
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                 }
            }
        })
    }

}
Validator.isRequired = function (selector, messege){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? messege || undefined : 'Vui lòng nhập trường này'
        }
    };
}
Validator.isEmail = function (selector, messege){
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? messege || undefined : 'Trường này phải là email'
        }
    };
}
Validator.minLength = function (selector, min, messege){
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? messege || undefined : `Vui lòng nhập tối thiểu ${min}`
        }
    };
}
Validator.isConfirmed = function (selector, getConfirmValue, messege){
    return {
        selector: selector,
        test: function(value){
            return value === getConfirmValue () ? undefined : messege || 'Dữ liệu nhập vào không chính xác'
        }
    }
}