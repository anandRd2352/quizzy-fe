package com.example.onlineexam.entity;

import jakarta.persistence.*;
import java.util.List;

import com.example.onlineexam.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;
    
    private Integer durationInMinutes;
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	 public Integer getDurationInMinutes() {
	        return durationInMinutes;
	    }

	    public void setDurationInMinutes(Integer durationInMinutes) {
	        this.durationInMinutes = durationInMinutes;
	    }

   
}
