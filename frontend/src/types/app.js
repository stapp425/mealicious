import { collection, limit, query, where } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
export function modifyData(original, option, data) {
    if (option === "format") {
        if (data)
            throw new Error("Formatting does not require a target data for processing");
        return original;
    }
    else {
        if (!data)
            throw new Error("A modification to the original list must require data");
    }
    let temp = [...original];
    if (data) {
        switch (option) {
            case "add":
                temp.push(data);
                break;
            case "remove":
                temp = original.filter(d => d.id !== data.id);
                break;
            case "update":
                temp = original.map(d => d.id === data.id ? data : d);
                break;
        }
    }
    return temp;
}
export function createQuery(user, path, options) {
    if (options && options.limit)
        return query(collection(firestore, path), where("userId", "==", user.uid), limit(options.limit));
    return query(collection(firestore, path), where("userId", "==", user.uid));
}
