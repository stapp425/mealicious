import { useState, useEffect } from "react";
import { getDoc, getDocs, updateDoc, doc, addDoc, collection, deleteDoc } from "firebase/firestore";
import { firestore, storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";
import * as dateFns from "date-fns";
import { isTimestamp } from "@/types/plan";
export const now = new Date();
export function useEventCalendar(data) {
    const [currentDay, setCurrentDay] = useState(now);
    const [events, setEvents] = useState(data);
    const adjacentDates = {
        day: {
            previous: dateFns.format(dateFns.add(now, { days: -1 }), "MMM yyyy"),
            next: dateFns.format(dateFns.add(now, { days: 1 }), "MMM yyyy")
        },
        week: {
            previous: dateFns.format(dateFns.add(currentDay, { weeks: -1 }), "MMM yyyy"),
            next: dateFns.format(dateFns.add(currentDay, { weeks: 1 }), "MMM yyyy")
        },
        month: {
            previous: dateFns.format(dateFns.add(currentDay, { months: -1 }), "MMM yyyy"),
            next: dateFns.format(dateFns.add(currentDay, { months: 1 }), "MMM yyyy")
        },
        year: {
            previous: dateFns.format(dateFns.add(currentDay, { years: -1 }), "yyyy"),
            next: dateFns.format(dateFns.add(currentDay, { years: 1 }), "yyyy")
        }
    };
    const calendar = {
        day: currentDay,
        week: getFullWeek(currentDay),
        month: getFullMonth(currentDay),
        year: getFullYear(currentDay)
    };
    const currentEvents = {
        day: getEventsOfInterval(dateFns.startOfDay(currentDay), dateFns.endOfDay(currentDay)),
        week: getEventsOfInterval(dateFns.startOfWeek(currentDay), dateFns.endOfWeek(currentDay)),
        month: getEventsOfInterval(dateFns.startOfMonth(currentDay), dateFns.endOfMonth(currentDay)),
        year: getEventsOfInterval(dateFns.startOfYear(currentDay), dateFns.endOfYear(currentDay))
    };
    function setDay(input) {
        return setCurrentDay(d => dateFns.addDays(d, input));
    }
    function setWeek(input) {
        return setCurrentDay(d => dateFns.addWeeks(d, input));
    }
    function setMonth(input) {
        return setCurrentDay(d => dateFns.addMonths(d, input));
    }
    function setYear(input) {
        return setCurrentDay(d => dateFns.addYears(d, input));
    }
    function getEventsOfInterval(start, end) {
        const interval = { start, end };
        return events.filter(event => dateFns.isWithinInterval(event.date, interval));
    }
    function getFullWeek(day) {
        return dateFns.eachDayOfInterval({
            start: dateFns.startOfWeek(day),
            end: dateFns.endOfWeek(day)
        });
    }
    function getFullMonth(day) {
        return dateFns.eachDayOfInterval({
            start: dateFns.startOfWeek(dateFns.startOfMonth(day)),
            end: dateFns.endOfWeek(dateFns.endOfMonth(day))
        });
    }
    function getFullYear(day) {
        return dateFns.eachMonthOfInterval({
            start: dateFns.startOfWeek(dateFns.startOfYear(day)),
            end: dateFns.endOfWeek(dateFns.endOfYear(day))
        }).map(month => getFullMonth(month));
    }
    useEffect(() => {
        if (data.length > 0)
            setEvents(formatEvents(data));
        function formatEvents(events) {
            return events.map(e => isTimestamp(e.date) ? ({ ...e, date: e.date.toDate() }) : e);
        }
    }, [data]);
    return {
        currentDay,
        setDay, setWeek,
        setMonth, setYear,
        getEventsOfInterval,
        adjacentDates,
        calendar,
        currentEvents
    };
}
export function useFirestoreFetch(query, formatFunction, initialData = []) {
    const [isFetching, setIsFetching] = useState(true);
    const [data, setData] = useState(initialData);
    useEffect(() => {
        fetchData();
        async function fetchData() {
            try {
                const data = await getDocs(query);
                const snapshot = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                const filteredData = snapshot.length > 0 ? await formatFunction(snapshot) : [];
                console.log(filteredData);
                setData(filteredData);
            }
            catch (err) {
                throw err;
            }
            finally {
                setIsFetching(false);
            }
        }
    }, []);
    return { isFetching, data, setData };
}
export function useFirestoreGet(path, id, formatFunction, initialData) {
    const [isFetching, setIsFetching] = useState(true);
    const [data, setData] = useState(initialData);
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {
            const result = await getDoc(doc(firestore, path, id));
            const snapshot = { ...result.data(), id: result.id };
            const filteredData = await formatFunction(snapshot);
            setData(filteredData);
        }
        catch (err) {
            throw err;
        }
        finally {
            setIsFetching(false);
        }
    }
    return { isFetching, data, fetchData };
}
export function useFirestoreUpdate() {
    const { toast } = useToast();
    const [isWorking, setIsWorking] = useState(false);
    async function updateFirestoreDoc(path, id, data) {
        try {
            setIsWorking(true);
            await updateDoc(doc(firestore, path, id), data);
            toast({
                title: "Success!",
                description: "Document successfully updated.",
                variant: "success"
            });
        }
        catch (err) {
            throw err;
        }
        finally {
            setIsWorking(false);
        }
    }
    return { isWorking, updateFirestoreDoc };
}
export function useFirestorePost() {
    const [isWorking, setIsWorking] = useState(false);
    const { toast } = useToast();
    async function addFirestoreDoc(path, data) {
        try {
            setIsWorking(true);
            const docRef = await addDoc(collection(firestore, path), data);
            const docData = await getDoc(docRef);
            toast({
                title: "Success!",
                description: "Successfully added document.",
                variant: "success"
            });
            return docData;
        }
        catch (err) {
            throw err;
        }
        finally {
            setIsWorking(false);
        }
    }
    return { isWorking, addFirestoreDoc };
}
export function useFirestoreDelete() {
    const { toast } = useToast();
    const [isWorking, setIsWorking] = useState(false);
    async function deleteFirestoreDoc(path, id) {
        try {
            setIsWorking(true);
            await deleteDoc(doc(firestore, path, id));
            toast({
                title: "Alert!",
                description: "Document successfully deleted.",
                variant: "destructive"
            });
        }
        catch (err) {
            throw err;
        }
        finally {
            setIsWorking(false);
        }
    }
    return { isWorking, deleteFirestoreDoc };
}
export function useStorageUpload() {
    const [isUploading, setIsUploading] = useState(false);
    async function uploadFile(file, fileName) {
        try {
            setIsUploading(true);
            const image = await uploadBytes(ref(storage, fileName), file);
            const imageRef = await getDownloadURL(image.ref);
            setIsUploading(false);
            return imageRef;
        }
        catch (err) {
            setIsUploading(false);
            throw err;
        }
    }
    return { isUploading, uploadFile };
}
export function useStorageDelete() {
    const [isDeleting, setIsDeleting] = useState(false);
    async function deleteFile(fileName) {
        try {
            const imageRef = ref(storage, fileName);
            setIsDeleting(true);
            await deleteObject(imageRef);
        }
        catch (err) {
            throw err;
        }
        finally {
            setIsDeleting(false);
        }
    }
    return { isDeleting, deleteFile };
}
export function useScroll() {
    const [scrollPoints, setScrollPoints] = useState({
        x: scrollX,
        y: scrollY
    });
    useEffect(() => {
        function handleScroll() {
            setScrollPoints({ x: scrollX, y: scrollY });
        }
        addEventListener("scroll", handleScroll);
        return () => removeEventListener("scroll", handleScroll);
    }, []);
    return scrollPoints;
}
export function useInputChange(initialInput) {
    const [input, setInput] = useState(initialInput);
    const [isEditActive, setIsEditActive] = useState(false);
    function handleChange(event) {
        const { name, value } = event.target;
        setInput(i => ({ ...i, [name]: value }));
    }
    return { input, isEditActive, setIsEditActive, setInput, handleChange };
}
