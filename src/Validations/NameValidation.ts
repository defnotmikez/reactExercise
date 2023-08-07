

export function isNameInvalid (name: unknown) {
        if(name === null || name === "") {
            console.log(name)
            return true;
        } else {
            return false;
        }
    }

