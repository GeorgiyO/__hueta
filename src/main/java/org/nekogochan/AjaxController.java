package org.nekogochan;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Controller
@RequestMapping("/ajax")
public class AjaxController {

    Logger log = LoggerFactory.getLogger(this.getClass());

    static class Directory {
        String name;
        ArrayList<Directory> children;

        void pushChild(String[] path) {
            if (path.length == 0) return;
            if (children == null) children = new ArrayList<>();

            var current = this;
            var subDir = path[0];

            var childIndex = -1;

            for (int i = 0; i < children.size(); i++) {
                if (children.get(i).name.equals(subDir)) {
                    childIndex = i;
                    break;
                }
            }

            if (childIndex == -1) {
                var newChild = new Directory();
                newChild.name = subDir;
                children.add(newChild);
                childIndex = children.size() - 1;
            }

            children.get(childIndex).pushChild(Arrays.copyOfRange(path, 1, path.length));
        }
    }

    Gson JSON = new Gson();

    private String getPublicFilesAsJson() throws IOException {
        var resources = new PathMatchingResourcePatternResolver().getResources("public/**/index.html");
        var projectsFolders = new String[resources.length];

        var pattern = Pattern.compile("(public\\/(.*)\\/index.html)");

        for (int i = 0; i < projectsFolders.length; i++) {
            var matcher = pattern.matcher(resources[i].getURL().getPath());
            if (matcher.find()) {
                var str = matcher.group();
                var substr = str.substring(7, str.length() - 11);
                if (!substr.contains("node_modules"))
                    projectsFolders[i] = substr;
            }
        }

        return JSON.toJson(toDirectory(projectsFolders));
    }

    void foo() {

    }

    private Directory toDirectory(String[] _paths) {
        Directory root = new Directory();
        root.name = "root";

        String[][] paths = new String[_paths.length][];
        for (int i = 0; i < paths.length; i++) {
            paths[i] = _paths[i].split("/");
        }

        for (var path : paths) {
            root.pushChild(path);
        }

        return root;
    }

    @GetMapping("get-public-projects-list")
    @ResponseBody
    public String getPublicProjectsList() throws IOException {
        String res = getPublicFilesAsJson();
        log.info(res);
        return getPublicFilesAsJson();
    }

}
