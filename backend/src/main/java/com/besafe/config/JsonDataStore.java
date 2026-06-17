package com.besafe.config;

import com.besafe.model.DataStore;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class JsonDataStore {

    @Value("${app.data.file:data.json}")
    private String dataFilePath;

    private final ObjectMapper mapper = new ObjectMapper();

    @Getter
    private DataStore data;

    private File file;

    @PostConstruct
    public void init() throws IOException {
        file = new File(dataFilePath);
        if (file.exists()) {
            data = mapper.readValue(file, DataStore.class);
        } else {
            data = new DataStore();
            save();
        }
    }

    public synchronized void save() throws IOException {
        mapper.writerWithDefaultPrettyPrinter().writeValue(file, data);
    }
}
