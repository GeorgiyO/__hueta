package _tmp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class DynamicSetters {

    static class ValueContainer<ValueType> {

        ValueType older;
        ValueType newer;

        public ValueContainer(ValueType older, ValueType newer) {
            this.older = older;
            this.newer = newer;
        }
    }

    @FunctionalInterface
    interface OnKeyChangeBi<ValueType> {
        void call(ValueType newValue, ValueType oldValue);
    }

    @FunctionalInterface
    interface OnKeyChange<ValueType> {
        void call(ValueType newValue);
    }

    static class DynamicProperty<ValueType> {

        static int id = Integer.MIN_VALUE;

        private ValueType value;

        private final Map<Integer, OnKeyChangeBi<ValueType>> onChange = new HashMap<>();

        DynamicProperty() {}

        DynamicProperty(ValueType defaultValue) {
            value = defaultValue;
        }

        public int addListener(OnKeyChangeBi<ValueType> callback) {
            id++;
            onChange.put(id, callback);
            return id;
        }

        public int addListener(OnKeyChange<ValueType> callback) {
            return addListener((_new, _old) -> callback.call(_new));
        }

        public boolean removeListener(int id) {
            return onChange.remove(id) != null;
        }

        public void set(ValueType newValue) {
            ValueType oldValue = value;
            value = newValue;
            for (var foo : onChange.values()) foo.call(newValue, oldValue);
        }

        public ValueType get() {
            return value;
        }
    }

    static class User {
        DynamicProperty<String> name = new DynamicProperty<>();
        DynamicProperty<Integer> age = new DynamicProperty<>(10);
        DynamicProperty<Integer> legsCount = new DynamicProperty<>(2);
    }


    public static void main(String[] args) {
        var user = new User();

        user.name.addListener((newValue) -> {
            System.out.println("set \"" + newValue + "\" as name to " + user);
        });
        user.legsCount.addListener((newValue, oldValue) -> {
            System.out.println(newValue > oldValue ? "more legs!!!" : "less legs(((");
        });

        user.name.set("Capitan Omerica");
        user.legsCount.set(0);
    }

}