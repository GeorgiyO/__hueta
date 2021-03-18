package _tmp;


public class Dick {

    interface Function {
        void call();
    }

    private static void _setTimeout(Function foo, long time) {
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        foo.call();
    }

    private static void setTimeout(Function foo, long time, boolean async) {
        if (async) {
            new Thread(() -> {
                _setTimeout(foo, time);
            }).start();
        } else {
            _setTimeout(foo, time);
        }
    }

    public static void main(String[] args) {
        System.out.println("1");
        setTimeout(() -> {
            System.out.println("2");
        }, 1000, false);
        System.out.println("3");
    }
}
