package net.industrialHome.hse.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

import net.industrialHome.hse.Enums.YesOrNo;

@JsonAutoDetect
@Entity
@Table(name="post")
public class Post extends BaseEntity<Long>{
	
	private String name;
	private YesOrNo HSEunderControl;
	private Integer level;
	private Post parent;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return super.getId();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name="level")
	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	@Enumerated(EnumType.ORDINAL)
	public YesOrNo getHSEunderControl() {
		return HSEunderControl;
	}

	public void setHSEunderControl(YesOrNo hSEunderControl) {
		HSEunderControl = hSEunderControl;
	}

	@ManyToOne(optional=true,cascade=CascadeType.ALL)
	@JoinColumn(name="parent_id")
	public Post getParent() {
		return parent;
	}

	public void setParent(Post parent) {
		this.parent = parent;
	}
	
}
